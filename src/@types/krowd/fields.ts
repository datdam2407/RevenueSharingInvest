export type FieldList = {
  numOfField: number;
  listOfField: Field[];
};
export type Field = {
  id: string;
  name: string;
  description: string;
  createDate: Date;
  createBy: string;
  updateDate: Date;
  updateBy: string;
  isDeleted: boolean;
};
