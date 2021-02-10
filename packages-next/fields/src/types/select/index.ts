import { Text } from '@keystonejs/fields';
import type { FieldType, BaseGeneratedListTypes, FieldDefaultValue } from '@keystone-next/types';
import { resolveView } from '../../resolve-view';
import type { FieldConfig } from '../../interfaces';

type _SelectConfig<T> = {
  options: { label: string; value: T }[];
  defaultValue?: FieldDefaultValue<T>;
};

export type SelectFieldConfig<
  TGeneratedListTypes extends BaseGeneratedListTypes
> = FieldConfig<TGeneratedListTypes> &
  (
    | ({ dataType?: 'string' | 'enum' } & _SelectConfig<string>)
    | ({ dataType: 'integer' } & _SelectConfig<number>)
  ) & {
    ui?: { displayMode?: 'select' | 'segmented-control' };
    isRequired?: boolean;
    isIndexed?: boolean;
    isUnique?: boolean; // This is a really weird thing to support -TL
  };

export const select = <TGeneratedListTypes extends BaseGeneratedListTypes>(
  config: SelectFieldConfig<TGeneratedListTypes>
): FieldType<TGeneratedListTypes> => ({
  type: Text,
  config,
  views: resolveView('select/views'),
  getAdminMeta: () => ({
    options: config.options,
    dataType: config.dataType ?? 'workf',
    displayMode: config.ui?.displayMode ?? 'select',
  }),
});
