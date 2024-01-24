
<template>
    <ModalRules  
    v-if="rulesStore == true"/>
    <div class="bg-gradient-radial w-[100%] h-[100vh] min-h-[100vh] pt-10 flex flex-col justify-evenly items-center gap-6 relative">
        
        <div class="fixed top-[15px] flex justify-between items-center w-[90%] laptop:w-[50%] mx-auto p-5 border-4 rounded-md border-slate-600">
            
        <div> 
            
            <div class="w-[90%] max-w-[10rem] tablet:w-[70%] text-white font-bold text-xs">
                <img src="../assets/images/logo.svg" alt="">
                <i class="opacity-40">by <span class="text-[#8fa4ff]">Breyner U.</span></i>
            </div>
        </div>

            <div class="w-[50%] ">
                <div 
                    class="
                        bg-slate-100  
                        text-center 
                        rounded-md 
                        px-6 py-2 min-w-[5rem] w-[50%] 
                        float-right">
                    <h4 class="font-barlow">score</h4>
                    <h5 class="text-[2rem] font-bold text-slate-600">{{ scorePlayer }}</h5>
                </div>
            </div>
        </div>
        
        <div  
        class="fixed z-10 mt-10 animacion" 
        v-if="modalResult" >

        <ModalWinner />
        </div>
        <div 
        v-if="!modalResult"
        :class="{'animated' : animated}" 
        class="fixed flex justify-center items-center gap-10  mx-auto flex-wrap  tablet:w-[50%] max-w-[20rem] animacion">
            <button 
            v-for="button in options" 
            class="active:opacity-30"
            @click="handleSelection(button.title)">
                <img 
                :key="button.index"
                :class="button.classes"
                :src="baseUrl + button.url" 
                :alt="button.title"
                :title="button.title">
            </button>
        </div>

            
        <div class="fixed bottom-[30px]">
            <button 
            @click="showRules"
            class=" bg-transparent border-2 border-slate-600 px-10 py-3 rounded-md text-white uppercase hover:bg-[#525f9987]">Rules</button>
        </div>
        
    </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import { useStore } from 'vuex'
import ModalRules from '../components/ModalRules.vue';
import ModalWinner from '../components/ModalWinner.vue'



const store = useStore()


const modalResult = computed(() => store.state.modalWinner)
const rulesStore = computed(() => store.state.rules)
const scorePlayer = computed(() => store.state.playerScore)

const baseUrl = import.meta.env.BASE_URL + "src/assets/images/"
const options = [{
    index: 0,
    title: 'rock',
    url: 'icon-rock.svg',
    classes: 'bg-white w-[6rem] h-[6rem] rounded-full border-[12px] border-[#D3405A]  p-2 transition-all duration-[0.3s]' 
},
{
    index: 1,
    title: 'paper',
    url: 'icon-paper.svg',
    classes: "bg-white w-[6rem] h-[6rem] rounded-full border-[12px] border-[#546EE4] p-2 transition-all duration-[0.3s] "
},
{
    index: 2,
    title: 'scissors',
    url: 'icon-scissors.svg',
    classes: "bg-white w-[6rem] h-[6rem] rounded-full border-[12px] border-[#DF9E20] p-2  transition-all duration-[0.3s]"
}]



let rules = ref(false)

const showRules = () => {
    console.log(rulesStore.value);
    store.commit('setRules', true);
}


const animated = ref(false)


const handleSelection = async (selection) => {
    const sondClick = new Audio();
    sondClick.src = "click.mp3";
    sondClick.load();
    sondClick.play();
    console.log(sondClick);
    await new Promise(resolve => setTimeout(resolve, 500));
  
    store.commit('setBtnSelected', selection);
  

  animated.value = true;


  // Esperar 1 segundo
  await new Promise(resolve => setTimeout(resolve, 600));

  animated.value = false;

  // Esperar 0.8 segundos antes de mostrar el modal

  setTimeout(() => {
    const audioMoadal = new Audio();
  audioMoadal.src = "cambiomodal.mp3";
  audioMoadal.load();
  audioMoadal.play();
  store.commit('setModalWinner', true);
  },500)

  // Sin async/await en la siguiente línea
  

};



</script>

<style scoped>
.animated {
    animation: animated 1s ;
    transition: all 1s;
}

@keyframes animated {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>