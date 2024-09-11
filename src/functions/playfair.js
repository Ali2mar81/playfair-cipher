// Function to generate the 5x5 key square
function generateKeyTable(key, keyLength, keyTable) {
    let i, j, k;
    // a 26 character hashmap
    // to store count of the alphabet
    let dicty = new Array(26).fill(0);
    for (i = 0; i < keyLength; i++) {
        let r = key[i].charCodeAt(0) - 97;

        if (key[i] != 'j') {
            dicty[r] = 2;
        }
    }

    dicty['j'.charCodeAt(0) - 97] = 1;
    i = 0;
    j = 0;
    for (k = 0; k < keyLength; k++) {
        let r = key[k].charCodeAt(0) - 97;
        if (dicty[r] == 2) {
            dicty[r] -= 1;
            keyTable[i][j] = key[k];
            j++;
            if (j == 5) {
                i++;
                j = 0;
            }
        }
    }

    for (k = 0; k < 26; k++) {
        if (dicty[k] == 0) {
            keyTable[i][j] = String.fromCharCode(k + 97);
            j++;
            if (j == 5) {
                i++;
                j = 0;
            }
        }
    }
    return keyTable;
}

// Function to search for the characters of a digraph
// in the key square and return their position
function search(keyTable, a, b, arr) {
    let i, j;

    if (a == 'j')
        a = 'i';
    else if (b == 'j')
        b = 'i';

    for (i = 0; i < 5; i++) {

        for (j = 0; j < 5; j++) {

            if (keyTable[i][j] == a) {
                arr[0] = i;
                arr[1] = j;
            }
            else if (keyTable[i][j] == b) {
                arr[2] = i;
                arr[3] = j;
            }
        }
    }
    return arr;
}

// Function to find the modulus with 5
function mod5(a) {
    return (a % 5);
}

// Function to make the plain text length to be even
function prepare(str, ptrs) {
    if (ptrs % 2 != 0) {
        str += 'z';
    }

    return [str, ptrs];
}

// Function for performing the encryption
function encrypt(str, keyTable, strLength) {
    let i;
    let a = new Array(4).fill(0);
    let newstr = new Array(strLength);

    for (i = 0; i < strLength; i += 2) {
        let brr = search(keyTable, str[i], str[i + 1], a);
        let k1 = brr[0];
        let k2 = brr[1];
        let k3 = brr[2];
        let k4 = brr[3];
        if (k1 === k3) {
            newstr[i] = keyTable[k1][(k2 + 1) % 5];
            newstr[i + 1] = keyTable[k1][(k4 + 1) % 5];
        }
        else if (k2 === k4) {
            newstr[i] = keyTable[(k1 + 1) % 5][k2];
            newstr[i + 1] = keyTable[(k3 + 1) % 5][k2];
        }
        else {
            newstr[i] = keyTable[k1][k4];
            newstr[i + 1] = keyTable[k3][k2];
        }
    }
    let result = "";

    for (let i = 0; i < newstr.length; i++) { result += newstr[i]; }
    return result;
}

// Function to encrypt using Playfair Cipher
function encryptByPlayfairCipher(str, key) {
    let strLength, keyLength;
    let keyTable = new Array(5);

    for (let i = 0; i < 5; i++) {
        keyTable[i] = new Array(5);
    }
    str = str.trim();
    key = key.trim();
    str = str.toLowerCase();

    key = key.toLowerCase();
    strLength = str.length;
    keyLength = key.length;
    [str, strLength] = prepare(str, strLength);

    let _keyTalbe = generateKeyTable(key, keyLength, keyTable);
    return encrypt(str, _keyTalbe, strLength);
}

function toLowerCase(plain) {
    // Convert all the characters of a string to lowercase
    return plain.toLowerCase();
}




// Decrypt


function removeSpaces(plain) {
    return plain.split(' ').join('');
}


// function generateKeyTableDe(key) {
//     // generates the 5x5 key square
//     var keyTable = new Array(5).fill(null).map(() => new Array(5).fill(''));
//     var dicty = {};
//     for (var i = 0; i < 26; i++) {
//         dicty[String.fromCharCode(i + 97)] = 0;
//     }

//     for (var i = 0; i < key.length; i++) {
//         if (key[i] != 'j') {
//             dicty[key[i]] = 2;
//         }
//     }
//     dicty['j'] = 1;

//     var i = 0, j = 0, k = 0;
//     while (k < key.length) {
//         if (dicty[key[k]] == 2) {
//             dicty[key[k]] -= 1;
//             keyTable[i][j] = key[k];
//             j += 1;
//             if (j == 5) {
//                 i += 1;
//                 j = 0;
//             }
//         }
//         k += 1;
//     }

//     for (var k in dicty) {
//         if (dicty[k] == 0) {
//             keyTable[i][j] = k;
//             j += 1;
//             if (j == 5) {
//                 i += 1;
//                 j = 0;
//             }
//         }
//     }

//     return keyTable;
// }

// function searchDe(keyTable, a, b) {
//     // Search for the characters of a digraph in the key square and return their position
//     var arr = [0, 0, 0, 0];

//     if (a == 'j') {
//         a = 'i';
//     } else if (b == 'j') {
//         b = 'i';
//     }

//     for (var i = 0; i < 5; i++) {
//         for (var j = 0; j < 5; j++) {
//             if (keyTable[i][j] == a) {
//                 arr[0] = i;
//                 arr[1] = j;
//             } else if (keyTable[i][j] == b) {
//                 arr[2] = i;
//                 arr[3] = j;
//             }
//         }
//     }

//     return arr;
// }

function decrypt(str, keyTable) {
    // Function to decrypt
    // var strLength = str.length;
    // var i = 0;
    // while (i < strLength) {
    //     var a = search(keyTable, str[i], str[i + 1]);
    //     if (a[0] == a[2]) {
    //         str = str.slice(0, i) + keyTable[a[0]][mod5(a[1] - 1)] + keyTable[a[0]][mod5(a[3] - 1)] + str.slice(i + 2);
    //     } else if (a[1] == a[3]) {
    //         str = str.slice(0, i) + keyTable[mod5(a[0] - 1)][a[1]] + keyTable[mod5(a[2] - 1)][a[1]] + str.slice(i + 2);
    //     } else {
    //         str = str.slice(0, i) + keyTable[a[0]][a[3]] + keyTable[a[2]][a[1]] + str.slice(i + 2);
    //     }
    //     i += 2;
    // }
    // return str;
    let strLength = str.length;
    let i;
    let a = new Array(4).fill(0);
    let newstr = new Array(strLength);

    for (i = 0; i < strLength; i += 2) {
        let brr = search(keyTable, str[i], str[i + 1], a);
        let k1 = brr[0];
        let k2 = brr[1];
        let k3 = brr[2];
        let k4 = brr[3];
        if (k1 === k3) {
            newstr[i] = keyTable[k1][((k2 - 1)+5) % 5];
            newstr[i + 1] = keyTable[k1][((k4 - 1)+5) % 5];
        }
        else if (k2 === k4) {
            newstr[i] = keyTable[((k1 - 1)+5) % 5][k2];
            newstr[i + 1] = keyTable[((k3 - 1)+5) % 5][k2];
        }
        else {
            newstr[i] = keyTable[k1][k4];
            newstr[i + 1] = keyTable[k3][k2];
        }
    }
    let result = "";

    for (let i = 0; i < newstr.length; i++) { result += newstr[i]; 
        console.log(result);
    }
    return result;
}

function decryptByPlayfairCipher(str, key) {
    // Function to call decrypt
    let keyTable = new Array(5);

    for (let i = 0; i < 5; i++) {
        keyTable[i] = new Array(5);
    }
    key = removeSpaces(toLowerCase(key));
    str = removeSpaces(toLowerCase(str));
    let _keyTalbe = generateKeyTable(key,key.length,keyTable);
    console.log(_keyTalbe);
    return decrypt(str, _keyTalbe);
}
// console.log(decryptByPlayfairCipher('fqkdgwcfgoky','abcd'));

export { decryptByPlayfairCipher, encryptByPlayfairCipher }