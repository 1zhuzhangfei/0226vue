<template>
    <div v-for="item in props.data" :key="item.label">
        <div :style="{ paddingLeft: `${props.padding ?? 0}px` }"
            class="flex hover:bg-black cursor-pointer text-[#bcbcbc] text-sm box-border"
            @click="emit('node-click', item.id)">
            {{ item.label }}
        </div>
        <div>
            <Tree v-if="item.children && item.children.length > 0 && props.expandKeys.includes(item.id)"
                :data="item.children" :padding="props.padding + 10" :expand-keys="props.expandKeys"
                @node-click="(id) => emit('node-click', id)">
            </Tree>
        </div>
    </div>
</template>
<script setup>

import { ref, useAttrs, defineProps, defineOptions, defineEmits } from 'vue';
import { Icon } from "@iconify/vue";
//通过defineOptions来规定组件的名称
defineOptions({ name: "Tree" });

const props = defineProps({
    data: {
        required: true,  //表示该属性是必须传递的
        type: Array,     //数据类型检测是依据构造函数的
    },
    padding: {
        type: Number,
        default: 10
    },
    expandKeys: {
        default: () => [],
    }

});

const emit = defineEmits(["node-click"])


</script>