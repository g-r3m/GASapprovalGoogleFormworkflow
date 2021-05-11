/**
 * doGet function for the script
 * @param {object} Request content
 * @return {String} Output displayed
 */
function doGet(request) {
  var user = Session.getActiveUser().getEmail();
  if (request.parameters.state == APPROVED_STATE) {
    var id = (request.parameters.i)+"";
    var last = (request.parameters.last);
    Logger.log(request.parameters.i);
    Logger.log(request.parameters.state);
    Logger.log(request.parameters.last);
    writeData_(id, APPROVED_STATE, last);
  }
  if (request.parameters.state == DENIED_STATE) {
    var id = (request.parameters.i)+"";
    var last = (request.parameters.last);   
    Logger.log(request.parameters.i);
    Logger.log(request.parameters.state);
    Logger.log(request.parameters.last);
    writeData_(id, DENIED_STATE, last);
  }
  return ContentService.createTextOutput('Thank you. Your response has been recorded.');
}
/**
 * Write data in Google Sheet based on doGet
 * Write in LOG_SHEET and Sheets()[0]
 * @param {String} Request ID
 * @param {String} Request state
 * @param {Integer} Request row in Sheet
 */
function writeData_(i, state, last) {
  var reportSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(LOG_SHEET);
  var dateForLogging = new Date().toLocaleString();
  var emailsession = Session.getActiveUser().getEmail();
  reportSheet.appendRow([dateForLogging, emailsession, i, state]);
  // Collect data from the line
  // Send email depending on the state
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  // Still assuming the Form data are in Sheets()[0]
  var sheet = ss.getSheets()[0];
  var dataRange = sheet.getRange(last, 1, 1, sheet.getLastColumn());
  Logger.log('dataRange: ' + dataRange.getA1Notation());
  var dataValues = dataRange.getValues();
  Logger.log(dataValues);
  if (state === APPROVED_STATE) {
    var rangeApprove = sheet.getRange(last, 5, 1, 1);
    Logger.log('rangeApprove: ' + rangeApprove.getA1Notation());
    rangeApprove.setValues([
      [emailsession + ' on: ' + dateForLogging]
    ]);
  }
  if (state === DENIED_STATE) {
    var rangeDeny = sheet.getRange(last, 6, 1, 1);
    Logger.log('rangeDeny: ' + rangeDeny.getA1Notation());
    rangeDeny.setValues([
      [emailsession + ' on: ' + dateForLogging]
    ]);
  }
  var Email = dataValues[0][1];
  var Purpose = dataValues[0][2];
  //reviewContent_(Requesteremail, RequestContent, Uuid, Last, state)
  reviewContent_(Email, Purpose, i, last, state);
}
