<template>
  <div @contextmenu.prevent class="w-screen h-screen overflow-hidden flex flex-col">
    <!-- 头部搜索栏 -->
    <Rightmenu :data="rightmenuList">
    <div class="w-full h-[35px] bg-[#3c3c3c] flex">
      <div class="flex flex-1 justify-center items-center">
        <div class="p-1 relative cursor-pointer hover:bg-[#323842]" @mouseover="leftArrowTip = true"
          @mouseout="leftArrowTip = false">
          <Icon icon="majesticons:arrow-left" width="24" height="24" style="color: #858585" />
          <div v-if="leftArrowTip === true"
            class="absolute text-[12px] z-20 w-[50px] text-center h-[20px] rounded-md bg-[#454545] text-[#eee]">
            返回
          </div>
        </div>
        <div class="p-1 relative cursor-pointer hover:bg-[#323842]" @mouseover="rightArrowTip = true"
          @mouseout="rightArrowTip = false">
          <Icon icon="majesticons:arrow-right" width="24" height="24" style="color: #858585" />
          <div v-if="rightArrowTip === true"
            class="absolute text-[12px] z-20 w-[50px] text-center h-[20px] rounded-md text-[#eee] bg-[#454545]">
            前进
          </div>
        </div>

        <input type="text"
          class=" outline-none text-center w-[421px] bg-[#4b4b4b] border-[1px] border-[#737373] rounded-md" readonly
          v-bind:placeholder="reponame">
      </div>
      
      <div class="ml-auto relative">
        <!-- 布局切换 -->
        <div class="flex mr-2 justify-center items-center">
          <div class="cursor-pointer p-1 hover:bg-[#323842]" @mouseover="layout = 'a'" @mouseout="layout = null">
            <Icon icon="codicon:layout" class="text-[#858585] size-6" />
          </div>
          <div class="cursor-pointer p-1 hover:bg-[#323842]" @mouseover="layout = 'b'" @mouseout="layout = null"
            @click.stop="updateLayoutSetting({
              leftBar: { visible: !setting?.layout.leftBar.visible }
            })">
            <Icon v-if="setting?.layout.leftBar.visible" icon="ri:layout-column-fill" class="text-[#858585] size-6" />
            <Icon v-else icon="tabler:layout-columns" class="text-[#858585] size-6" />
          </div>
          <div class="cursor-pointer p-1 hover:bg-[#323842]" @mouseover="layout = 'c'" @mouseout="layout = null"
            @click.stop="updateLayoutSetting({
              bottomBar: { visible: !setting?.layout.bottomBar.visible }
            })">
            <Icon v-if="setting?.layout.bottomBar.visible" icon="tabler:layout-bottombar-filled"
              class="text-[#858585] size-6" />
            <Icon v-else icon="tabler:layout-bottombar" class="text-[#858585] size-6" />
          </div>
          <div class="cursor-pointer p-1 hover:bg-[#323842]" @mouseover="layout = 'd'" @mouseout="layout = null"
            @click.stop="updateLayoutSetting({
              rightBar: { visible: !setting?.layout.rightBar.visible }
            })">
            <Icon v-if="setting?.layout.rightBar.visible" icon="tabler:layout-sidebar-right-filled"
              class="text-[#858585] size-6" />
            <Icon v-else icon="fluent:layout-column-one-third-right-16-regular" class="text-[#858585] size-6" />
          </div>
        </div>
        <!-- 布局切换选中提示框 -->
        <div v-if="layout === 'a'" class="absolute w-[150px] text-sm rounded-sm text-[#eee] bg-[#252526]">自定义布局…</div>
        <div v-else-if="layout === 'b'" class="absolute w-[150px] text-sm rounded-sm text-[#eee] bg-[#252526]">切换主侧栏
        </div>
        <div v-else-if="layout === 'c'" class="absolute w-[150px] text-sm rounded-sm text-[#eee] bg-[#252526]">切换面板
        </div>
        <div v-else-if="layout === 'd'" class="absolute w-[150px] text-sm rounded-sm text-[#eee] bg-[#252526]">切换辅助侧栏
        </div>
      </div>


    </div>
    </Rightmenu>
    <!-- 中间主模块 -->
    <div class="flex flex-1 p-0">
      <!-- 左侧侧边栏 -->
      <div class="bg-[#333] flex flex-col p-0 justify-between items-center">

        <div class="p-0 cursor-pointer" ref="el">
          <VueDraggable ref="el" v-model="menuIcons">
            <div v-for="(item, index) in menuIcons" @click="activeMenuIndex = index" :key="index"
              :class='["text-[#858585] my-2 w-[48px] flex flex-col justify-between items-center hover:text-[#cccfd4]", { "text-[#cccfd4] border-l-4": index === activeMenuIndex }]'>
              <Icon :icon="item.name" width="24" height="24" />
            </div>
          </VueDraggable>

        </div>

        <div>
          <div class=" p-2">
            <Icon icon="codicon:account" width="24" height="24" style="color: #858585" />
          </div>
          <div class=" p-2">
            <Icon icon="lets-icons:setting-line" width="24" height="24" style="color: #858585" />
          </div>
        </div>
      </div>
      <!-- 左侧目录 -->
      <div v-show="setting?.layout.leftBar.visible" class="w-[307px] bg-[#252526]">
        <div class="flex justify-between items-center text-[#eee]">
          <span class="text-[12px] pl-4">资源管理器</span>
          <div class="w-[30px] h-[30px] relative text-center inline-block rounded-md cursor-pointer hover:bg-[#323842]"
            v-on:mouseover="showtip" v-on:mouseout="hidetip">

            <!-- 下拉菜单 -->
            <Dropdown @checked="checkedCallback" :data="dropdownList">
              <div>···</div>
              <!-- 提示框 -->
              <div v-show="tooltipVisible"
                class="absolute text-[12px] z-20 w-[150px] h-[25px] rounded-md border-[#454545]">视图和更多操作
              </div>
            </Dropdown>
          </div>

        </div>
        <div class=" border-t-2">
          <!-- <div v-for="(file, index) in data" :key="file.name" v-text="file.name"></div> -->

          <Tree :data="data" :expandKeys="expandIds" @node-click="fn" />
        </div>
      </div>
      <!-- 工作区 -->
      <div class="flex-1 flex flex-col bg-[#1e1e1e]">
        <div class="flex-1"></div>
        <div ref="elementRef" v-show="setting?.layout.bottomBar.visible"
          :style='{ height: setting?.layout.bottomBar.height + "px" }' class="border-t border-[#414141]">
          <div ref="bottomBarPinter" class=" h-[3px] highlight cursor-row-resize"></div>
        </div>
      </div>
      <!-- 右侧辅助栏 -->
      <div v-show="setting?.layout.rightBar.visible" class="w-[307px] bg-[#252526]">
        <Dropdown @checked="checkedCallback" :data="arr1">
          <!-- 插槽 -->
          <Icon icon="uil:setting" width="24" height="24" style="color: #ec0772;" />
        </Dropdown>
      </div>
    </div>
    <!-- 底部状态栏 -->
    <div class="w-full h-[22px] bg-[#007acc]"></div>
  </div>
</template>


<script setup>

//所有的DOM操作都被vue封装成一个个指令
//DOM操作 => 指令语法
//不允许使用DOM操作

//在vue.js中,指令是操作DOM的唯一方法
//指令是以v-开头的一种特殊的标签的自定义属性,它具备操作DOM的能力
//vue.js中 数据变化（响应式数据） => 视图更新
//响应式API的作用,将js数据转换为响应式数据
//v-text
//v-on 
//v-show 控制元素显示/隐藏 通过display:none
//v-for 循环渲染 注意点:v-for指令 一定要搭配v-bind:key=“当前列表唯一不变的值”一般绑定id,提升循环渲染性能
//v-bind 给所有标签属性(官方、自定义)绑定值的

import { ref, onMounted, isRef, watchEffect, watch } from "vue";
import { Icon } from "@iconify/vue";
import axios from "axios";
import { useApi, useclickOutside, useSetting } from "./hooks/index";
import Dropdown from "./components/dropdown.vue";
import Rightmenu from "./components/rightmenu.vue";
import Tree from './components/Tree.vue';
import { VueDraggable } from 'vue-draggable-plus';

//获取左侧文件树数据
const { loading, error, data } = useApi(() => axios.get("/api/each"), {
  defaultData: [],
});
const expandIds = ref([]);
const fn = (id) => {
  const index = expandIds.value.indexOf(id);
  if (index > -1) {
    expandIds.value.splice(index, 1);
  } else {
    expandIds.value.push(id);
  }

};


const tooltipVisible = ref(false);
const reponame = ref("按名称搜索文件");
const dropdownList = [
  {
    name: "打开的编辑器",
    disable: true
  },
  {
    name: "文件夹",
    disable: false
  },
  {
    name: "大纲",
    disable: true
  },
  {
    name: "时间线",
    disable: false
  },
];
const rightmenuList = [
  {
    name: "菜单栏",
    disable: true,
    visible: false
  },
  {
    name: "指挥中心",
    disable: true,
    visible: true
  },
  {
    name: "导航控件",
    disable: true,
    visible: true
  },
  {
    name: "布局控件",
    disable: true,
    visible: true
  },
];
const arr1 = [
  {
    name: "1",
    disable: true
  },
  {
    name: "2",
    disable: false
  },
  {
    name: "3",
    disable: true
  },
  {
    name: "4",
    disable: false
  },
];



const menuIcons = [
  {
    name: "iconoir:github-circle",
    id: 1
  },
  {
    name: "uil:bars",
    id: 2
  },
  {
    name: "uil:copy",
    id: 3
  },
  {
    name: "codicon:search",
    id: 4
  },
  {
    name: "ri:git-branch-line",
    id: 5
  },
  {
    name: "codicon:debug-alt",
    id: 6
  },
  {
    name: "codicon:extensions",
    id: 7
  },
  {
    name: "mage:robot-sad",
    id: 8
  }];

function actionMenu(callback) {

  const activeMenuIndex = ref(2);
  watchEffect(function () {
    callback(activeMenuIndex.value);

  })
  return { menuIcons, activeMenuIndex };
}

const { activeMenuIndex } = actionMenu(function (key) {
  switch (key) {
    case 0:
      console.log(0)
      break;
    case 1:
      console.log(1)
      break;
    case 2:
      console.log(2)
      break;
    case 3:
      console.log(3)
      break;
    case 4:
      console.log(4)
      break;
    case 5:
      console.log(5)
      break;
    case 6:
      console.log(6)
      break;
    case 7:
      console.log(7)
      break;

    default:
      break;
  }
})

//获取DOM节点使用
//某些操作需要template渲染完成后执行
//控制下拉菜单  组合式api
// function actionDropdown() {
//   const domRef = ref(null);
//   const visble = ref(false);
//   const open = () => { visble.value = true };
//   useclickOutside(domRef, () => visble.value = false);
//   return { visble, open, domRef };
// }
// const { visble: dropdownVisble, open: opendropdown, domRef: dropDownContainerRef } = actionDropdown();

function showtip() {
  tooltipVisible.value = true;
}
function hidetip() {
  tooltipVisible.value = false;
}

//箭头、布局选中显示/隐藏提示
const leftArrowTip = ref(false);
const rightArrowTip = ref(false);
const layout = ref(null);

//更改页面布局
const { setting, updateSetting: updateLayoutSetting } = useSetting();
//拖拽效果

//命名规范：组合式函数的名称必须以use开头
//普通函数和组合式函数的区别
//组合式函数需要有组合式API的参与
//为什么要封装组合式函数：为了对状态的复用

//组合式函数如何正确使用
//组合式函数只能使用在两个位置：组件的script标签的顶层，其他组合式函数中
function useMoveDistance(elementRef) {
  const distanceX = ref(0);
  const distanceY = ref(0);
  onMounted(() => {
    if (!(isRef(elementRef) && elementRef.value instanceof HTMLElement)) throw new Error("elementRef不是一个ref数据或其值不是一个HTML元素");
    elementRef.value.addEventListener('mousedown', ({ x: startX, y: startY }) => {
      const onMousemove = ({ x: currentX, y: currentY }) => {
        distanceX.value = currentX - startX;
        distanceY.value = currentY - startY;
      }
      document.addEventListener('mousemove', onMousemove);
      document.addEventListener('mouseup', () =>
        document.removeEventListener("mousemove", onMousemove));
    })
  })
  return { distanceX, distanceY }
}

const elementRef = ref(null);
const { distanceY } = useMoveDistance(elementRef);
const h = setting.value.layout.bottomBar.height;
watch([distanceY], () => {
  updateLayoutSetting({
    bottomBar: {
      height: h - distanceY.value
    }
  })
})

function checkedCallback(arg) {
  console.log(arg);
  if (arg.name === "1") {
    console.log("触发自定义事件1");

  }

}

function handleRightClick() {


}



</script>
<style scoped>
@keyframes delay {
  0% {
    background-color: transparent;
  }

  50% {
    background-color: transparent;
  }

  100% {
    background-color: #ef4444;
  }
}

.highlight:hover {
  animation: delay 0.8s forwards;
}
</style>