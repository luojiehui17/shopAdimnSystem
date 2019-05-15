<template>
    <div>
        <div id="main" style="width:1000px;height:500px;"></div>
    </div>
</template>

<script>
var echarts = require('echarts');
import {getReports} from '@/api'
export default {
    data() { 
        return {
            // 报表数据 初始数据
            options: {
                title: {
                    text: '各地区数据'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name:'邮件营销',
                        type:'line',
                        stack: '总量',
                        data:[120, 132, 101, 134, 90, 230, 210]
                    },
                ]
            }
        }
    },
    methods:{

    },
    created(){

    },
    mounted(){
        // 由于请求与响应有延迟，造成首次渲染页面时拿不到数据就使用了初始数据，
        // 所以必须把绘制图标的执行代码放在请求成功响应后的代码里面，这样才能使绘图时使用的数据是后台响应的数据
        getReports(1).then(res=>{
            console.log(res)
            this.options.series = res.data.series
            this.options.xAxis = res.data.xAxis[0]
            this.options.xAxis.type = 'category'
            this.options.xAxis.boundaryGap = false
            this.options.yAxis = res.data.yAxis[0]
            this.options.legend = res.data.legend
             // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('main'));
            // 绘制图表
            myChart.setOption(this.options);
        })
        
    }
}
</script>

<style lang="scss" scoped>

</style>