export class Folder {
    /**
     * Id Folderu
     *
     * @type {number}
     * @memberof Folder
     */
    id: number;
    /**
     * Nazwa folderu
     *
     * @type {string}
     * @memberof Folder
     */
    name: string;

    /**
     * Po podfoldery
     *
     * @type {number[]}
     * @memberof Folder
     */
    subFolders: number[]

    /**
     * Creates an instance of Folder.
     * @param {number} id 
     * @param {string} name
     * @param {number[]} [subFolders=[]]
     * @memberof Folder
     */
    constructor(id: number, name: string, subFolders: number[] = []) {
        this.name = name;
        this.id = id;
        this.subFolders = subFolders;
    }
}