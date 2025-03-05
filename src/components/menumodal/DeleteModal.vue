<template>
    <div v-show="visible" class=" fixed t-0 l-0 w-full h-full bg-[rgba(0,0,0,0.5)] flex justify-center items-center">
        <div class=" bg-white p-[20px]">删除数据</div>
    </div>
    

</template>
<script>
export default {
  name: 'DeleteModal',
  props: {
    visible: Boolean,
  },
}
</script>




