/**
 * Create Approval URI
 * param {string}: Script URI
 * param {string}: UUID generated
 * param {string}: state of the request
 * return {string}: Generated URI
 */
function approveURI_(scriptUri, Uuid, state, last){
 return scriptUri + "?i=" + Uuid + '&state=' + APPROVED_STATE + '&last=' + last ;
} 
/**
 * Create Deny URI
 * param {string}: Script URI
 * param {string}: UUID generated
 * param {string}: state of the request
 * return {string}: Generated URI
 */
function denyURI_(scriptUri, Uuid, last){
 return scriptUri + "?i=" + Uuid + '&state=' + DENIED_STATE + '&last=' + last ;
} 

/**
 * Generate uuid based on:
 * @params: {integer} Google Sheets last colums
 * @return: {string} newUUUID
*/
function uuid_(lastcol) {
  var date = (new Date().valueOf()).toString().substring(3, 8);
  var newID = 'PO-'+lastcol+date; 
  //return Utilities.getUuid();
  return newID;
}

