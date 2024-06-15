import { promises as fs } from 'fs';
import { join } from 'path';
import { cwd } from 'process';
import { authenticate } from '@google-cloud/local-auth';
import { google } from 'googleapis';
import dotenv from 'dotenv';
dotenv.config();

// !! WARNING API might crush if .env file is not present or not properly configured !!

// Adopted from https://developers.google.com/sheets/api/quickstart/nodejs

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = join(cwd(), 'token.json');
const TOKEN_CONTENT = `{"type": "${process.env.token_type}", "client_id": "${process.env.token_client_id}", "client_secret": "${process.env.token_client_secret}", "refresh_token": "${process.env.token_refresh_token}"}`;
const CREDENTIALS_PATH = join(cwd(), 'credentials.json');
const CREDENTIALS_CONTENT = `{"installed":{"client_id":"${process.env.credentials_client_id}","project_id":"${process.env.credentials_project_id}","auth_uri":"${process.env.credentials_auth_uri}","token_uri":"${process.env.credentials_token_uri}","auth_provider_x509_cert_url":"${process.env.credentials_auth_provider_x509_cert_url}","client_secret":"${process.env.credentials_client_secret}","redirect_uris":["http://localhost"]}}`;
const SPREADSHEET_ID = process.env.spreadsheet_id;

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
    try {
        const credentials = JSON.parse(TOKEN_CONTENT);
        return google.auth.fromJSON(credentials);
    } catch (err) {
        return null;
    }
}

/**
 * Serializes credentials to a file comptible with GoogleAUth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client) {
    const keys = JSON.parse(CREDENTIALS_CONTENT);
    const key = keys.installed || keys.web;
    const payload = JSON.stringify({
        type: 'authorized_user',
        client_id: key.client_id,
        client_secret: key.client_secret,
        refresh_token: client.credentials.refresh_token,
    });
    await fs.writeFile(TOKEN_PATH, payload);
}

/**
 * Load or request or authorization to call APIs.
 *
 */
async function authorize() {
    let client = await loadSavedCredentialsIfExist();
    if (client) {
        return client;
    }
    client = await authenticate({
        scopes: SCOPES,
        keyfilePath: CREDENTIALS_PATH,
    });
    if (client.credentials) {
        await saveCredentials(client);
    }
    return client;
}

// ------------------------------------------------------------ API FUNCTIONS ------------------------------------------------------------

/**
 * Write all response values to the spreadsheet:
 * @param {Array} responseValues [First Name, Last Name, Email, Subject, How do you know about us?, To subscript?, Message]
 * @return {Promise<boolean>} True if successfully added to spreadsheet, false otherwise
 */
async function addResponse(responseValues) {
    const auth = await authorize();
    const sheets = google.sheets({version: 'v4', auth});
    // Read the spreadsheet
    const resRead = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: 'Sheet1',
    });
    const rows = resRead.data.values;
    if (!rows || rows.length === 0) {
        console.log('Google api: No data found.');
        return false;
    }
    const new_row = Number(rows[5][0]) + 1;
    const start_col = rows[2][0].slice(0, 1);
    const end_col = rows[8][0].slice(0, 1);

    // Add timestamp to response
    const timestamp = new Intl.DateTimeFormat('en-CA', {
		dateStyle: 'short',
		timeStyle: 'long',
		hour12: false,
		timeZone: 'Canada/Mountain',
	}).format(Date.now());
    responseValues.unshift(timestamp);

    let values = [responseValues];
    const resource = {
        values,
    };

    // Write the spreadsheet
    const writeRange = `Sheet1!${start_col}${new_row}:${end_col}`;

    try {
        const result = await sheets.spreadsheets.values.append({
            spreadsheetId: SPREADSHEET_ID,
            range: writeRange,
            valueInputOption: 'USER_ENTERED',
            resource,
        });

        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}

export { addResponse };

// addResponse(['Hello', 'World', '1233333']).catch(console.error);