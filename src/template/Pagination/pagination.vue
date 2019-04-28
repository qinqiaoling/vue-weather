<template>
    <div class="paginations">
        <span class="total"><b>共{{totalCount}}条记录</b><b>第{{currentPage}}/{{totalPage}}页</b></span>
        <ol class="paging">
            <li class="prev" :class="{'disabled':currentPage<=1}" @click="currentPage<=1?'':turn(currentPage-1)">
                <i class="iconfont icon-prev"><</i>
            </li>
            <li v-for="i in showPageBtn" class="num" :class="{'active':i==currentPage}" v-if="i>0" @click="turn(i)">{{i}}</li>
            <li v-else-if="i==='-'" class="num iconfont icon-more" :class="{'icon-d-arrow-left':toPrev}" @click="turn(currentPage-1)" @mouseenter="toPrev=true" @mouseleave="toPrev=false">...</li>
            <li v-else-if="i==='+'" class="num iconfont icon-more" :class="{'icon-d-arrow-right':toNext}" @click="turn(currentPage+1)" @mouseenter="toNext=true" @mouseleave="toNext=false">...</li>
            <li class="next" :class="{'disabled':currentPage>=totalPage}"  @click="currentPage>=totalPage?'':turn(currentPage+1)">
                <i class="iconfont icon-next">></i>
            </li>
        </ol>
        <select v-model="limitNum" @change="turn(currentPage)">
            <option v-for="item in limitNums" :value="item">{{item}}条/页</option>
        </select>
        <span class="jump">
            前往<input type="number" autocomplete="off" min="1" max="4" v-model="goPage" @keyup.enter="turn(goPage)">页
        </span>
    </div>
</template>

<script>
    export default {
        name:'MyPagination',
        props: {
            currentPage: {//当前页
                type: Number,
                default: 1,
            },
            limit:{//每页显示条数
                type: Number,
                default: 10,
            },
            totalCount:{//总条数
                type: Number,
                required: true
            }
        },
        data() {
            return {
                goPage:'',
                limitNum:'',
                limitNums:[5,10,15,20,25,30],
                toPrev:false,
                toNext:false,
            }
        },
        created: function () {
            this.initLimitNums();
        },
        computed: {
            totalPage(){
                return Math.ceil(this.totalCount / this.limit)
            },
            showPageBtn() {
                let pageNum = Number(this.totalPage),
                index = Number(this.currentPage),
                arr = [];
                if (pageNum <= 9) {
                    for(let i = 1; i <= pageNum; i++) {
                        arr.push(i)
                    }
                    return arr
                }
                // if (index < 5) return [1,2,3,4,5,6,7,'+',pageNum]
                if (index < 5) return [1,2,3,4,5,'+',pageNum]//小于5时初始值5页
                if (index >= pageNum -1) return [1,2,'-', pageNum -5,pageNum -4,pageNum -3, pageNum -2, pageNum -1, pageNum]
                if (index === pageNum -2) return [1,2,'-', pageNum -5,pageNum -4,pageNum-3, pageNum-2, pageNum-1, pageNum]
                return [1,'-', index-2,index-1, index, index + 1,index + 2, '+', pageNum]
            }
        },
        methods: {
            initLimitNums() {
                this.limitNum=this.limit;
                if (this.limitNums.indexOf(this.limit) == -1) {
                    this.limitNums.push(this.limit);
                    this.limitNums.sort(function (a, b) {
                        return a-b;
                    });
                }
            },
            //翻页，显示条数变化
            turn(page) {
                let i = parseInt(Number(page));
                if(i<1){
                    i=1;
                }else if(i>this.totalPage){
                    i=this.totalPage;
                }
                if(this.limitNum!==this.limit&&this.limitNum!==''){//每页显示条数改变
                    let pages=Math.ceil(this.totalCount / this.limitNum);
                    if(page>pages){
                        i=pages;
                    }
                  this.$emit('update:limit', this.limitNum);
                }
                this.$emit('update:currentPage', i);
                this.$emit('turn');
            }
        }
    }
</script>
<style lang="scss" type="text/css">
    .paginations{
        line-height: 30px;
        user-select: none;
        text-align: right;
        .total{
            display: inline-block;
            line-height: 32px;
            b{padding: 0 5px;font-weight: normal;}
        }
        .paging{
            display: inline-block;
            margin: 0 20px;
            vertical-align: middle;
            li{
                display: inline-block;
                min-width: 32px;
                margin: 0 2px;
                padding: 0 4px;
                border: 1px solid #000;
                text-align: center;
                cursor: pointer;
                box-sizing: border-box;
                &:not(.disabled):not(.active):hover{
                    /*border-color: #f00;
                    color: #f00;*/
                }
                &.active{
                    color: #fff;
                    background-color: #ddd;
                    cursor: default;
                }
                &.disabled{
                    color: #000;
                    cursor: not-allowed;
                }
            }
        }
        input,
        select{
            margin: 0 4px;
            border: 1px solid #ddd;
            text-align: center;
        }
        input{width: 80px;height: 32px;line-height: 32px;}
        input[type=number]::-webkit-inner-spin-button,  
        input[type=number]::-webkit-outer-spin-button,
        input[type=number] {-webkit-appearance: none;-moz-appearance:textfield;/*去除数字输入框右边上下箭头*/} 
        select{padding: 0 20px;height: 34px;line-height: 34px;-webkit-appearance: menulist-button;-moz-appearance:menulist-button;}
        .jump{
            display: inline-block;
        }
    }
</style>