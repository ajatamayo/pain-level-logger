const header = `
<!DOCTYPE html>
<html>
  <head>
  </head>
  <body style="margin: 0; float: left; color: #4a4a4a;">
    <table cellspacing="0" cellpadding="0" border="0" align="center" style="width: 100%; max-width: 810px">
      <tr>
        <td colspan="2" bgcolor="#ffffff" style="color: #4a4a4a; background: #ffffff">`;
const footer = `
        </td>
      </tr>
      <tr>
        <td width="32px" align="left" style="padding: 32px 0 0 0; width: 20px" valign="top">
          <img src="cid:logo.png" style="width: 18px; height: auto" alt="pain.atamayo.io" />
        </td>
        <td align="left" style="padding: 32px 0 0 2px" valign="top">
          pain.atamayo.io
        </td>
      </tr>
    </table>
  </body>
</html>
`;

function getHtml(content) {
  return `${header}${content}${footer}`;
}

module.exports = { getHtml };
