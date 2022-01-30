export const validateFolderPath = (folderPath: string): boolean => {
    const regexPath = /^(\/[^/ ]*)+\/?$/gm;
    const result = folderPath.replace(regexPath, 'OK');
    if(result === 'OK')
        return true;
    else
        return false;
}

/**
 *  Function that will format the path before creating folder
 *  Params: path of type string
 *  on success - return formated path of type string
 *  on error   - throw error
 * **/

export const formatFolderPath = ( path: string ) : string => {

    const check = validateFolderPath(path);
    if(check){
        const regexPath = /\w+[.]\w+/g;
        const regexMatch = path.match(regexPath)[0];
        const folderPath = path.replace(regexMatch, '').trim();
        return folderPath;
    } else {
        throw 'Bad path!'
    }

}