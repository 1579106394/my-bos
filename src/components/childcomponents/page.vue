<template>
    <div class="block">
        <el-pagination @size-change="handleSizeChange" 
                        @current-change="handleCurrentChange" 
                        :current-page="page.currentPage" 
                        :page-sizes="[10, 15, 20, 30]"
            :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="page.totalCount">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        methods: {
            handleSizeChange(val) {
                // this.currentCount = val
                this.page.currentCount = val
                this.$emit('page', this.page)
            },
            handleCurrentChange(val) {
                // this.currentPage = val
                this.page.currentPage = val
                this.$emit('page', this.page)
            }
        },
        data() {
            return {
                // currentPage: 1,
                // totalCount: 50,
                // currentCount: 10
            };
        },
        props: [
            'page'
        ]
    }
</script>

<style scoped>
</style>