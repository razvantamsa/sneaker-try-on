// import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
// import { Repository } from "typeorm";
// import { isNil, keys, reduce } from "ramda";

// @Injectable()
// export class BaseService<Model, CreateInputData, EditInputData> {
//   constructor(readonly repository: Repository<Model>) {}

//   async create(createData: CreateInputData): Promise<Model> {
//     const obj = reduce(
//       (acc, key) => {
//         if (!isNil(createData[key])) {
//           return {
//             ...(acc ?? {}),
//             [key]: createData[key]
//           };
//         }
//         return acc;
//       },
//       {},
//       keys(createData)
//     );

//     const unsavedObj = this.repository.create(obj);

//     return await this.repository.save(unsavedObj);
//   }

//   async get(id: string): Promise<Model> {
//     return await this.repository.findOne(id);
//   }

//   async list(): Promise<Model[]> {
//     return await this.repository.find();
//   }

//   async getAfterEdit(id: string): Promise<Model> {
//     return await this.repository.findOneBy(id);
//   }

//   async edit(id: string, editData: EditInputData): Promise<Model> {
//     const obj = await this.get(id);

//     if (isNil(obj)) {
//       return null;
//     }

//     const result = await this.repository.update(id, { ...editData });

//     if (!result) {
//       return null;
//     }

//     return await this.getAfterEdit(id);
//   }

//   async delete(id: string): Promise<boolean> {
//     try {
//       return !!(await this.repository.delete(id));
//     } catch (exception) {
//       throw new HttpException("This is currently in use and cannot be deleted", HttpStatus.INTERNAL_SERVER_ERROR);
//     }
//   }
// }
