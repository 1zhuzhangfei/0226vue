<template>
    <DeleteModal :visible="showModal"></DeleteModal>
        <div @click.stop="emit('node-click', item.fullPath)" v-for="item in props.data" :key="item">
        <div :style="{ paddingLeft: `${props.padding ?? 0}px` }" class="flex hover:bg-black cursor-pointer text-[#bcbcbc] text-sm box-border">
            <div v-if="item.children && item.children.length > 0">
                <Icon v-if="!props.expandKeys.includes(item.fullPath)" icon="tabler:chevron-right" width="20" height="20"  style="color: #858585" />
                <Icon v-else icon="tabler:chevron-down" width="20" height="20"  style="color: #858585" />
            </div>
            <Rightmenu @checked="controlsCallback" :data="controlsList">
                {{ item.name }}
            </Rightmenu>
            
        </div>
        <div>
            <Tree v-if="item.children && item.children.length > 0 && props.expandKeys.includes(item.fullPath)" :data="item.children" 
                :padding="props.padding + 10"
                :expand-keys="props.expandKeys"
                @node-click="(id) => emit('node-click', id)"
                >
            </Tree>
        </div>
    </div>
    
</template>
<script setup>
//如何获取组件属性传递的数据
//useAttrs、defineProps
//attribute property 都是表达属性
//attribute 侧重表达的是HTML属性 出现在HTML标签中
//property 侧重表达的是DOM属性 不会出现在HTML标签中
//useAttrs 可以直接使用 没有数据检验和默认值的功能（不严谨但方便）
//defineProps 不能直接使用 需要通过数据检验还具备默认值的功能（严谨但不方便）

import { ref,useAttrs, defineProps, defineOptions,defineEmits } from 'vue';
import { Icon } from "@iconify/vue";
import Rightmenu from './rightmenu.vue';
import { controlsList } from '../menuConfig';
import DeleteModal from './menumodal/DeleteModal.vue';
//通过defineOptions来规定组件的名称
defineOptions({ name: "Tree" });
const props = defineProps({
    data: {
        required:true,  //表示该属性是必须传递的
        type:Array,     //数据类型检测是依据构造函数的
    },
    padding: {
        type:Number,
        default:10
    },
    expandKeys: {
        default: () => [],
    }
    
});

const emit = defineEmits(["node-click"])
const showModal = ref(false);
function controlsCallback(arg){
    if (arg.id === 1) {
        showModal.value = true
        console.log("触发删除事件");
    }
}
// baz:{
    //     required:true,
    //     validator(value){
            
    //         return ["a","b","c"].includes(value);
            
    //     }
    // }

</script>