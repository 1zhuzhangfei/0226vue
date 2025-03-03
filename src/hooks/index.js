import { ref, onMounted, reactive, toRef } from "vue";
import store from "store";
import { merge } from "lodash";
import defaultSetting from "../../config/setting.json"

export function useclickOutside(domRef, callback) {
    onMounted(function () {
        //执行的时机是在template挂载到页面之后
        //引用数据类型 value属性是null 异步获取节点然后赋值给value
        document.addEventListener("click", (e) => {
            if (!domRef.value?.contains(e.target)) {
                callback();
            }
        })
    })
}

export function useApi(api, option = {}) {
    const loading = ref(true);
    const error = ref(null);
    const data = ref(option.defaultData ?? null);
    const run = () => {
        api().then((res) => {
            data.value = res.data;
        }).catch((err) => {
            error.value = err;
        }).finally(() => {
            loading.value = false;
        })
    }
    if (option.manual) {
        return { loading, error, data, run };
    }
    run();
    return { loading, error, data };
}

//reactive 和 ref
//都是来初始化响应数据的
//开发中能用ref解决就使用ref解决 否则使用reactive
//reactive可以转换为ref
//reactive参数只接受对象 ref参数是任意类型
//reactive在使用时，无论是在script块中还是在template块中，都可以直接通过属性名访问
//ref在使用时，在script块中需要通过.value后跟属性名取值,在template块中可以直接通过属性名访问
//注意：reactive数据可以通过toRef、toRefs这两个API转换为ref响应式数据
//reactive还原原始数据 使用toRaw
//ref还原原始数据  JSON.parse(JSON.stringify(toValue(ref数据)))
export function useSetting() {
    // const setting = ref(null);
    const config = reactive({ setting: null });

    const settingFromCache = store.get("setting");
    if (!settingFromCache) {
        config.setting = defaultSetting;
        store.set('setting', defaultSetting);
    } else {
        config.setting = settingFromCache;
    }

    const updateSetting = (params) => {
        const updateDate = merge(config.setting, { layout: { ...params } });
        config.setting = updateDate;
        store.set('setting', updateDate);

    }

    return { setting: toRef(config, "setting"), updateSetting };
}

