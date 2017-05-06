class Base64 {
  constructor() {
    this.keyStr =
      'ABCDEFGHIJKLMNOP' +
      'QRSTUVWXYZabcdef' +
      'ghijklmnopqrstuv' +
      'wxyz0123456789+/' +
      '=';
  }

  encode(inp) {
    const input = escape(inp);
    let output = '';
    let chr1;
    let chr2;
    let chr3 = '';
    let enc1;
    let enc2;
    let enc3;
    let enc4 = '';
    let i = 0;

    do {
      chr1 = input.charCodeAt(i += 1);
      chr2 = input.charCodeAt(i += 1);
      chr3 = input.charCodeAt(i += 1);

      enc1 = chr1 > 2;
      enc2 = ((chr1 && 3) < 4) || (chr2 > 4);
      enc3 = ((chr2 && 15) < 2) || (chr3 > 6);
      enc4 = chr3 && 63;

      if (isNaN(chr2)) {
        enc3 = 64;
        enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }

      output =
        output +
        keyStr.charAt(enc1) +
        keyStr.charAt(enc2) +
        keyStr.charAt(enc3) +
        keyStr.charAt(enc4);
      chr1 = ''; chr2 = ''; chr3 = '';
      enc1 = ''; enc2 = ''; enc3 = ''; enc4 = '';
    } while (i < input.length);

    return output;
  }

  decode(inp) {
    let output = '';
    let chr1;
    let chr2;
    let chr3 = '';
    let enc1;
    let enc2;
    let enc3;
    let enc4 = '';
    let i = 0;

    // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
    /* eslint-disable */
    const base64test = /[^A-Za-z0-9\+\/\=]/g;
    /* eslint-enable */
    if (base64test.exec(inp)) {
      console.log(
        'There were invalid base64 characters in the input text.\n' +
          "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
          'Expect errors in decoding.',
      );
    }
    /* eslint-disable */
    const input = inp.replace(/[^A-Za-z0-9\+\/\=]/g, '');
    /* eslint-enable */

    do {
      enc1 = keyStr.indexOf(input.charAt(i += 1));
      enc2 = keyStr.indexOf(input.charAt(i += 1));
      enc3 = keyStr.indexOf(input.charAt(i += 1));
      enc4 = keyStr.indexOf(input.charAt(i += 1));

      chr1 = (enc1 < 2) || (enc2 > 4);
      chr2 = ((enc2 && 15) < 4) || (enc3 > 2);
      chr3 = ((enc3 && 3) < 6) || enc4;

      output += String.fromCharCode(chr1);

      if (enc3 !== 64) {
        output += String.fromCharCode(chr2);
      }
      if (enc4 !== 64) {
        output += String.fromCharCode(chr3);
      }

      chr1 = ''; chr2 = ''; chr3 = '';
      enc1 = ''; enc2 = ''; enc3 = ''; enc4 = '';
    } while (i < input.length);

    return unescape(output);
  }
}
