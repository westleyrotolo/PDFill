export interface IFormFill {
    filename: string;
    items: Item[];
    docFile: DocFile;
}
export class FormFill {
    filename: string = "";
    item: Item[] = [];
    docfile: DocFile = DocFile.Docx;
}
export class Item {
    key: string = "";
    normalized: string = "";
    value: string = "";
}
export enum DocFile {
    Doc,
    Docx,
    XML
}