/**
 * Send email based on a template message intent from Dialogflow Agent.
 * @param {String} Requester email to find intent
 * @param {String} Requester content 
 * @param {String} Generated UUID for the request
 * @param {Integer} Id of the last row of the sheet
 * @param {state} Opt state of the request
 */
function reviewContent_(Requesteremail, RequestContent, Uuid, Last, state) {
  Logger.log('reviewContent Requesteremail: ' + Requesteremail + ' RequestContent: ' + RequestContent + ' Uuid: ' + Uuid + ' Last: ' + Last + " state: " + state);
  var scriptUri = ScriptApp.getService().getUrl();
  Logger.log(scriptUri)
  // hack some values on to the data just for email templates.
  var ApprovalUrl = scriptUri + "?i=" + Uuid + '&state=' + APPROVED_STATE + '&last=' + Last;
  var DenyUrl = scriptUri + "?i=" + Uuid + '&state=' + DENIED_STATE + '&last=' + Last;
  Logger.log(ApprovalUrl);
  Logger.log(DenyUrl);
  var form = {
    requester_Email: Requesteremail,
    requester_Content: RequestContent,
    uu_Id: Uuid,
    approval_Url: ApprovalUrl,
    deny_Url: DenyUrl
  };
  if (state === undefined) {
    // state is new
    var templ = HtmlService.createTemplateFromFile('EmailTemp');
    templ.form = form;
    var message = templ.evaluate().getContent();
    MailApp.sendEmail({
      to: Requesteremail,
      cc: Session.getEffectiveUser().getEmail(),
      bcc: Session.getEffectiveUser().getEmail(),
      subject: "[New Request] New moderation request",
      htmlBody: message
    });
  }
  if (state === APPROVED_STATE) {
    // state is approved
    var templ = HtmlService.createTemplateFromFile('EmailApprove');
    templ.form = form;
    var message = templ.evaluate().getContent();
    MailApp.sendEmail({
      to: Requesteremail,
      cc: Session.getEffectiveUser().getEmail(),
      subject: "[Request - Approval workflow] Request Approve",
      htmlBody: message
    });
  }
  if (state === DENIED_STATE) {
    // state is deny
    var templ = HtmlService.createTemplateFromFile('EmailDeny');
    templ.form = form;
    var message = templ.evaluate().getContent();
    MailApp.sendEmail({
      to: Requesteremail,
      cc: Session.getEffectiveUser().getEmail(),
      subject: "[Request - Approval workflow] Request Deny",
      htmlBody: message
    });
  }
}
