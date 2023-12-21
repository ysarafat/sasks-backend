import { FilterQuery, Query } from 'mongoose';

export class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }
  // active user
  isDeleted(isDeleted?: boolean) {
    this.modelQuery = this.modelQuery.find({
      isDeleted: isDeleted ? true : false,
    });
    return this;
  }
  // search
  search(searchableFields: string[]) {
    const searchBy = this?.query?.searchBy;
    if (searchBy) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: searchBy, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }
    return this;
  }
  // filtering
  filter() {
    const queryObj = { ...this.query };
    const excludeField = ['searchBy', 'sort', 'limit', 'page', 'fields'];
    excludeField.forEach((el) => delete queryObj[el]);
    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);
    return this;
  }

  // sorting
  sort() {
    const sort =
      (this?.query?.sort as string)?.split(',')?.join(' ') || '-createdAt';
    this.modelQuery = this.modelQuery.sort(sort as string);

    return this;
  }

  //paginate
  paginate() {
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);

    return this;
  }

  //  limiting fields
  fields() {
    const fields =
      (this?.query?.fields as string)?.split(',')?.join(' ') || '-__v';
    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }
}
