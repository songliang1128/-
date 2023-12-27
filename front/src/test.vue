<script >
// 假设这里是你的Vue组件中的方法
{
  async downloadExcel() {
    try {
      // 调用后台接口获取文件字节码
      const response = await this.$axios.get('/your-backend-api/exportExcel');

      // 创建Blob对象
      const blob = new Blob([response.data], { type: 'application/octet-stream' });

      // 创建Blob对应的URL
      const url = URL.createObjectURL(blob);

      // 创建一个<a>元素
      const link = document.createElement('a');

      // 设置<a>元素的href和download属性，模拟点击下载
      link.href = url;
      link.download = '任务工作量分配表.xlsx';

      // 将<a>元素添加到DOM中
      document.body.appendChild(link);

      // 触发点击事件
      link.click();

      // 移除<a>元素
      document.body.removeChild(link);

      // 释放URL对象
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('下载文件时发生错误：', error);
    }
  }
}

</script>

<template>

</template>

<style scoped>

</style>