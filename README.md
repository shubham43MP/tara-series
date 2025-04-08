# Setup Instructions

## Clone the Repository

Run the following command to **download the project** to your local machine:

```sh
git clone <repository-url>
```

Replace `<repository-url>` with the actual URL of your Git repository.

## Navigate to the Project Folder

Move into the project folder after cloning:

```sh
cd <project-folder>
```

Replace `<project-folder>` with the name of the cloned project directory.

## Install Dependencies

Run the following command to **install all required dependencies** using Yarn:

```sh
yarn install
```

This ensures all necessary packages are installed.

## Start the Development Server

Run the following command to **start the Next.js development server**:

```sh
yarn run dev
```

By default, this runs the server on `http://localhost:3000/`.

## Expose Local Server to the Internet (Optional)

If you want to expose your local development server using **Ngrok**, run:

```sh
ngrok http 3000
```

Ngrok will provide a **public URL** that can be accessed from anywhere or deploy this app and use that public URL.

---

## Google Sheets Table

Download the CSV file: **[table.csv](./table.csv)**

| Planet  |  ID | Zodiac | Entry Date | Exit Date  |
| ------- | --: | -----: | ---------- | ---------- |
| jupiter |   0 |      3 | 2024-05-01 | 2025-05-09 |
| venus   |   1 |      7 | 2024-07-01 | 2024-08-13 |
| saturn  |   2 |     11 | 2023-01-17 | 2025-03-29 |
| rahu    |   3 |     12 | 2023-10-30 | 2025-04-18 |
| ketu    |   4 |      6 | 2023-10-30 | 2025-04-18 |

---

## Google Apps Script

Open **Extensions > Apps Script** in Google Sheets, delete any existing code, and paste the following script:

```javascript
function onEdit(e) {
  var sheetName = 'Sheet1'; // ✅ Update Sheet Name if needed
  var sheet = e.source.getSheetByName(sheetName);

  if (!sheet) {
    Logger.log("❌ Error: Sheet '" + sheetName + "' not found.");
    return;
  }

  var editedRange = e.range; // Get the edited cell range
  Logger.log('📌 Edited Cell: ' + editedRange.getA1Notation());

  var data = sheet.getDataRange().getValues(); // ✅ Fetch all data
  if (data.length < 2) {
    // Ensure there's actual data (excluding headers)
    Logger.log(
      "❌ Error: No data found in '" + sheetName + "' (excluding headers)."
    );
    return;
  }

  var latestData = {};

  // ✅ Assuming first row is headers: ['Planet', 'ID', 'Zodiac', 'EntryDate', 'ExitDate']
  for (var i = 1; i < data.length; i++) {
    // Start from row 1 to skip headers
    if (data[i].length < 5) {
      Logger.log('⚠️ Skipping row ' + (i + 1) + ' due to missing values.');
      continue;
    }

    var planet = data[i][0]?.toString().trim(); // Planet Name
    latestData[planet] = {
      id: data[i][1], // ID
      zodiac: data[i][2], // Zodiac Sign
      entryDate: data[i][3], // Entry Date
      exitDate: data[i][4] // Exit Date
    };
  }

  var url = 'https://your-public-api-url.com/locale/api/webhook'; // ✅ Replace with your actual public API URL

  var options = {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(latestData),
    muteHttpExceptions: true
  };

  try {
    var response = UrlFetchApp.fetch(url, options);
    Logger.log('✅ Response: ' + response.getContentText());
  } catch (error) {
    Logger.log('❌ Error sending request: ' + error.toString());
  }
}
```

Replace `"https://your-public-api-url.com/locale/api/webhook"` with your actual **public API URL**.  
Edit your Google Sheets table, open **Apps Script**, and check the logs (`View > Execution Log`) to ensure the **POST request** is triggered and data is sent correctly.
