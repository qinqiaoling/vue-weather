<!-- //利用element-ui的 <template slot-scope="scope">属性，在插入多级表格 -->
<!-- 
prop说明
/*data，必填，原始数据,要求是一个数组或者对象
/*columns，列属性,要求是一个数组
    text: 显示在表头的文字
    value: 对应data的key。treeTable将显示相应的value
    width: 每列的宽度，为一个数字(可选)
    如果你想要每个字段都有自定义的样式或者嵌套其他组件，columns可不提供，直接像在el-table一样写即可，如果没有自定义内容，提供columns将更加的便捷方便
    如果你有几个字段是需要自定义的，几个不需要，那么可以将不需要自定义的字段放入columns，将需要自定义的内容放入到slot中
/*expandAll，是否默认全部展开，boolean值，默认为false
/*evalFunc，解析函数，function，非必须，如果不提供，将使用默认的evalFunc
/*evalArgs，解析函数的参数，是一个数组
    请注意，自定义的解析函数参数第一个为this.data，第二个参数为， this.expandAll,你不需要在evalArgs填写。一定记住，这两个参数是强制性的，并且位置不可颠倒 this.data为需要解析的数据，this.expandAll为是否默认展开
    如你的解析函数需要的参数为(this.data, this.expandAll,1,2,3,4)，那么你只需要将[1,2,3,4]赋值给evalArgs就可以了
    如果你的解析函数参数只有(this.data, this.expandAll),那么就可以不用填写evalArgs了
/*slot，这是一个自定义列的插槽。
    默认情况下，treeTable只有一行行展示数据的功能。但是一般情况下，我们会要给行加上一个操作按钮或者根据当行数据展示不同的样式，这时我们就需要自定义列了。slot和columns属性可同时存在,columns里面的数据列会在slot自定义列的左边展示
 -->
 <!-- /*
 * 树形数据转换
 * @param {*} data
 * @param {*} columns
 * @param {*} expandAll
 * @param {*} evalFunc
 * @param {*} evalArgs
 * class="el-icon-minus" ——‘-’图标 
 * class="el-icon-plus" —— ‘+’图标 
 */ -->
<template>
    <el-table 
        ref="multipleTable" 
        :data="formatData" 
        :row-style="showRow" 
        v-bind="$attrs" 
        @selection-change="handleSelectionChange">
        <slot name="before"></slot> <!-- 具名插槽，不用slot name  将不会渲染 -->
        <el-table-column v-if="columns.length===0" width="150">
            <template slot-scope="scope">
                <span v-for="space in scope.row._level" class="ms-tree-space" :key="space"></span>
                <span class="tree-ctrl" v-if="iconShow(0,scope.row)" @click="toggleExpanded(scope.$index)">
                    <i v-if="!scope.row._expanded" class="el-icon-plus"></i>
                    <i v-else class="el-icon-minus"></i>
                </span>
                {{scope.$index}}
            </template>
        </el-table-column>
        <el-table-column v-else v-for="(column, index) in columns" :key="column.value" :label="column.text" :width="column.width">
            <template slot-scope="scope">
                <span v-if="index === 0" v-for="space in scope.row._level" class="ms-tree-space" :key="space"></span>
                <span class="tree-ctrl" v-if="iconShow(index,scope.row)" @click="toggleExpanded(scope.$index)">
                    <i v-if="!scope.row._expanded" class="el-icon-plus"></i>
                    <i v-else class="el-icon-minus"></i>
                </span>
                {{scope.row[column.value]}}
            </template>
        </el-table-column>
        <slot name="after"></slot>  <!-- 具名插槽，不用slot name  将不会渲染 -->
        <slot></slot>  <!-- 无名插槽，会默认在添加的位置渲染 -->
    </el-table>
</template>

<script>
    import treeToArray from '@/assets/js/treetable.js'
    export default {
        name: 'treeTabletemplate',
        data() {
            return {
                // chooseson: true, //全选
                // key: true, //单个点击直到全部选中
                multipleTable:[],
            };
        },
        props: {
            datas: {
                type: [Array, Object],//原始数据,要求是一个数组或者对象
                required: true  //必填
            },
            columns: {
                type: Array,//列属性,要求是一个数组
                default: () => []
            },
            evalFunc: Function,//解析函数，function，非必须，如果不提供，将使用默认的evalFunc
            evalArgs: Array,//解析函数的参数，是一个数组
            expandAll: {
                type: Boolean,//是否默认全部展开，boolean值，默认为false
                default: false
            }
        },
        computed: {
            // 格式化数据源 //计算属性转换父组件转换data数据
            formatData: function() {
                let tmp
                if (!Array.isArray(this.datas)) {
                    tmp = [this.datas]
                } else {
                    tmp = this.datas
                }
                const func = this.evalFunc || treeToArray
                const args = this.evalArgs ? Array.concat([tmp, this.expandAll], this.evalArgs) : [tmp, this.expandAll]
                return func.apply(null, args)
            }
        },
        mounted() {
            this.onChange(false);
        },
        methods: {
            showRow: function(row) {
                const show = (row.row.parent ? (row.row.parent._expanded && row.row.parent._show) : true)
                row.row._show = show
                return show ? 'animation:treeTableShow 1s;-webkit-animation:treeTableShow 1s;' : 'display:none;'
            },
            onChange(flag){
                this.$nextTick(() => {
                    var that = this;
                    if (flag == true) {
                        that.setchildtobeselect(that.formatData, true);
                    } else {
                        that.setchildtobeselect(that.formatData, false);
                    }
                });
            },
            // 切换下级是否展开
            toggleExpanded: function(trIndex) {
                const record = this.formatData[trIndex]
                record._expanded = !record._expanded
                console.log(record,trIndex,record._expanded)
            },
            // 图标显示
            iconShow(index, record) {
                return (index === 0 && record.children && record.children.length > 0)
            },
            // 多选table,当选择项发生变化时会触发该事件  selection
            handleSelectionChange(val){
                this.multipleTable = val;
                this.$emit('handle',this.multipleTable);
                // console.log(this.multipleTable)
            },
            //设置表头全选
            // renderHeader(h, data) {
            //     return h("span", [
            //         h("input", {
            //             attrs: {
            //                 id: "chooseall",
            //                 type: "checkbox",
            //                 style:
            //                   "border: 1px solid #dcdfe6;border-radius: 2px;box-sizing: border-box;width: 14px;height: 14px;background-color: #fff;"
            //             }
            //         })
            //     ]);
            // },
            //功能函数:选中部分子集
            setchildtobeselect(arr, key) {
                arr.forEach((v, i) => {
                    v.checks = key;
                    v._expanded = key;//选中后展开子项
                    if (v.child) {
                        this.setchildtobeselect(v.child, v.checks);
                    }
                });
            },
            //是否所有的都被选中
            isallchecked(arr) {
                arr.forEach((v, i) => {
                    if (!v.checks) {
                        this.key = false;
                    }
                    if (v.child) {
                        this.isallchecked(v.child);
                    }
                });
            },
            //设置父级为 未选中状态（父级的父级没改变-有bug）
            setparentfalse(arr, id, level) {
                arr.forEach((v, i) => {
                    if (v._level == level - 1 && v.child) {
                        v.child.forEach((val, ind) => {
                            if (val.id == id) {
                                v.checks = false;
                                return false; //终止此次循环，减少循环次数
                            }
                        });
                    }
                    if (v.child) {
                        this.setparentfalse(v.child, id, level);
                    }
                });
            },
            //设置父级为 选中状态
            setparenttrue(arr, id, level) {
                arr.forEach((v, i) => {
                    if (v._level == level - 1 && v.child) {
                        let key = true;
                        let sameidkey = false;
                        v.child.forEach((val, ind) => {
                            if (val.id == id) {
                                //确保当前点击的在该父级内
                                sameidkey = true;
                            }
                            if (!val.checks) {
                                key = false;
                            }
                        });
                        if (key && sameidkey) {
                            v.checks = true;
                        }
                    }
                    if (v.child) {
                        this.setparentfalse(v.child, id, level);
                    }
                });
            },
            //某个复选框被点击时
            toselect(row) {
                console.log(row);
                row._expanded = row.checks;//选中后是否展开
                //1、若有子集先让子选中
                if (row.child) {
                    this.setchildtobeselect(row.child, row.checks);
                }
                //2、然后判断是否全选中
                this.key = true; //重置为true，防止上次已经是false的状态
                this.isallchecked(this.formatData);
                //3、设置多选框的状态
                if (!row.checks) {
                    this.setparentfalse(this.formatData, row.id, row._level); //设置父级选中的状态为false
                    document.getElementById("chooseall").checked = false; //设置全选框的状态
                } else {
                    this.setparenttrue(this.formatData, row.id, row._level); //设置父级选中的状态为true
                }
                if (this.key) {
                    document.getElementById("chooseall").checked = true; //设置全选框的状态
                }
            },
        }
    }
</script>
<style rel="stylesheet/css">
    @keyframes treeTableShow {
        from {opacity: 0;}
        to {opacity: 1;}
    }
    @-webkit-keyframes treeTableShow {
        from {opacity: 0;}
        to {opacity: 1;}
    }
</style>
<style lang="scss" rel="stylesheet/scss" scoped>
    $color-blue: #2196F3;
    $space-width: 18px;
    .ms-tree-space {
        position: relative;
        top: 1px;
        display: inline-block;
        font-style: normal;
        font-weight: 400;
        line-height: 1;
        width: $space-width;
        height: 14px;
        &::before {
          content: ""
        }
    }
    .processContainer{
        width: 100%;
        height: 100%;
    }
    table td {
        line-height: 26px;
    }
    .tree-ctrl{
        position: relative;
        cursor: pointer;
        color: $color-blue;
        margin-left: -$space-width;
    }
</style>