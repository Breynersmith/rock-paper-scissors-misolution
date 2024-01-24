<template>
    <div 
        v-if="ModalRules" 
        @click="toggleModal"
        class="bg-slate-100 h-[100vh] w-[100%] absolute top-0 text-center flex flex-col items-center justify-center gap-16 z-[10000]">
        <h1 class="text-3xl font-bold uppercase text-gray-700">Rules</h1>
        <div>
            <img src="/image-rules.svg" alt="">
        </div>
        <button 
        @click="toggleModal" 
        class="font-bold  text-[#3b42629b]  rounded-lg text-[1.8rem] uppercase absolute top-2 right-6">
            X

        </button>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex';

const store = useStore();

const ModalRules = computed(() => store.state.rules)

const toggleModal = () => {
    store.commit('setRules', false)
}


</script>