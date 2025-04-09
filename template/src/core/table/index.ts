import { SorterResult } from 'antd/lib/table/interface';
import dayjs, { Dayjs } from 'dayjs';
import lodash from 'lodash';

import { PaginationEntity } from '@core/pagination/entity';

type OP = '$eq' | '$gt' | '$gte' | '$lt' | '$lte' | '$ilike';
type OP2 = '$btw' | '$in';

interface IFilterNor {
  value: string | number;
  op?: OP | `$not:${OP}`;
}

interface IFilterIn {
  value: Array<string | number | Dayjs>;
  op: '$in' | '$not:$in';
}

interface IFilterBtw {
  value: [string, string] | [number, number] | [Dayjs, Dayjs];
  op: '$btw' | '$not:$btw';
}

interface IFilterNull {
  value: undefined;
  op: '$not:$null' | '$null';
}

export interface IFilter {
  [propName: string]: IFilterNor | IFilterBtw | IFilterIn | IFilterNull | undefined;
}

export class OptionEntity {
  search?: string;

  searchFields?: Array<string>;

  filterDate?: Date;

  filter?: IFilter;

  sorter?: SorterResult<any>;

  constructor(option) {
    if (option == null) {
      return;
    }
    Object.assign(this, option);
  }
}

export class TableEntity extends PaginationEntity {
  SortQuery?: Array<string>;

  searchKeyword?: string;

  searchFields?: Array<string>;

  constructor(pagination: any, option?: OptionEntity) {
    super(pagination);
    this.searchKeyword = option?.search || undefined;

    if (option?.searchFields != null) {
      this.searchFields = option.searchFields;
    }

    if (option?.sorter?.order != null) {
      const order = option.sorter.order === 'ascend' ? 'asc' : 'desc';
      const field = lodash.isArray(option.sorter.field)
        ? option.sorter.field.join('.')
        : option.sorter.field;
      this.sortQuery = option.sorter.field ? `${field} ${order}` : undefined;
    }
    if (option?.filter != null) {
      Object.keys(option.filter).forEach(kye => {
        const v: IFilterNor | IFilterBtw | IFilterIn | IFilterNull | undefined = lodash.get(
          option.filter,
          kye,
        );

        if (v == null || v.value == null) {
          return;
        }

        if (typeof v === 'string' && String(v).startsWith('$')) {
          this[`filter.${kye}`] = v;
        } else if (typeof v === 'string') {
          this[`filter.${kye}`] = v === '0' ? undefined : `$eq:${v}`;
        } else {
          if (v.op == null) {
            v.op = '$eq';
          }
          if (v.op === '$btw' || v.op === '$in' || v.op === '$not:$btw' || v.op === '$not:$in') {
            const length = v.value?.length;
            const ff: string = (v.value as Array<any>)?.reduce(
              (total: string, it: any, ii: number) => {
                if (dayjs.isDayjs(it)) {
                  total += it.toISOString();
                } else {
                  total += it;
                }
                if (ii < length - 1) {
                  total += ',';
                }
                return total;
              },
              `${v.op}:`,
            );
            this[`filter.${kye}`] = ff;
          } else {
            this[`filter.${kye}`] = `${v.op}:${v.value ? v.value : ''}`;
          }
        }
      });
    }
    // Object.assign(this, option?.filter);
  }
}
