// YApi QuickType插件生成，具体参考文档:https://plugins.jetbrains.com/plugin/18847-yapi-quicktype/documentation

export interface TableSchema {
    tables:      Table[];
    is_disabled: boolean;
    description: string;
    id:          number;
    branch:      number;
}

export interface Table {
    area:         number;
    code:         string;
    is_disabled:  boolean;
    order_amount: number;
    modified:     string;
    description:  string;
    orders:       Table[];
    id:           number;
    status:       string;
}
