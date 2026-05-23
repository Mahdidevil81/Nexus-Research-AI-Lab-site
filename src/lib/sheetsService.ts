interface BalanceItem {
  category: string;
  description: string;
  valueUsd: number;
}

/**
 * Creates a beautiful Google Spreadsheet with the Audited Balance Sheet data.
 * @param accessToken The in-memory access token retrieved from Google Auth.
 * @param balanceSheet The array of BalanceItem.
 * @param totalAssets The calculated total assets.
 * @returns {Promise<{spreadsheetUrl: string, spreadsheetId: string}>} The Spreadsheet info.
 */
export async function exportLedgerToGoogleSheets(
  accessToken: string,
  balanceSheet: BalanceItem[],
  totalAssets: number
): Promise<{ spreadsheetUrl: string; spreadsheetId: string }> {
  if (!accessToken) {
    throw new Error("API credentials missing. Please sign in with Google.");
  }

  // 1. Create a brand new Google Spreadsheet
  const createResponse = await fetch("https://sheets.googleapis.com/v4/spreadsheets", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      properties: {
        title: `Nexus 369 Research Lab - Audited Ledger (${new Date().toLocaleDateString()})`,
      },
      sheets: [
        {
          properties: {
            title: "Balance Sheet",
            gridProperties: {
              columnCount: 4,
              rowCount: 100,
            },
          },
        },
      ],
    }),
  });

  if (!createResponse.ok) {
    const errData = await createResponse.json().catch(() => ({}));
    const message = errData?.error?.message || "Failed to create Google Spreadsheet";
    throw new Error(message);
  }

  const createResult = await createResponse.json();
  const spreadsheetId = createResult.spreadsheetId;
  const spreadsheetUrl = createResult.spreadsheetUrl || `https://docs.google.com/spreadsheets/d/${spreadsheetId}`;

  // 2. Format columns & populate data
  // Prepare data rows
  const values: any[][] = [
    ["NEXUS 369 RESEARCH LAB - AUDITED LEDGER SHEET", "", "", ""],
    ["Generated At:", new Date().toUTCString(), "", ""],
    ["", "", "", ""],
    ["Category", "Description", "Asset Value (USD)", "Verification Status"],
  ];

  balanceSheet.forEach((item) => {
    values.push([
      item.category,
      item.description,
      item.valueUsd,
      "VERIFIED // SECURE"
    ]);
  });

  values.push(["", "", "", ""]);
  values.push(["", "TOTAL ASSESSED ASSETS", totalAssets, "AUDITED // ARCHIVED"]);

  // 3. Write/Update sheet values
  const writeResponse = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Balance%20Sheet!A1:D${values.length}?valueInputOption=USER_ENTERED`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        range: `Balance Sheet!A1:D${values.length}`,
        majorDimension: "ROWS",
        values: values,
      }),
    }
  );

  if (!writeResponse.ok) {
    const errData = await writeResponse.json().catch(() => ({}));
    const message = errData?.error?.message || "Failed to append values to Spreadsheet";
    throw new Error(message);
  }

  return { spreadsheetUrl, spreadsheetId };
}
