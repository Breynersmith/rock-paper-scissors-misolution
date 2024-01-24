<template>
    <div class="flex flex-col items-center gap-8 text-center bg-transparent rounded-xl animacion">
       
        <div class="flex justify-center gap-8 text-center">
            <div >
                <div 
                :class="ganador === 'you win' ? 'shadow-xl' : 'text-red-500'">
                    <h2 
                    
                    class="mb-4 text-xs text-white uppercase">you picked</h2>
                    <div
                    :class="ganador === 'you win' ? 'shadow' : ''" >
                        <div 
                    :class="dataReactive.clasesPlayer" >
                        <img :src="dataReactive.img" :alt="dataReactive.title">
                    </div>
                    </div>
                </div>
            </div>
            <div>
                <div >
                    <h2 class="mb-4 text-xs text-white uppercase">the house picked</h2>
                    <div 
                    class="p-0 rounded-full w-[6rem] h-[6rem] flex justify-center items-center"
                    :class="ganador === 'you lose' ? 'shadow' : ''" >
                        <div 
                    :class="dataReactive.classesComputer">
                        <img :src="dataReactive.imgComputer" :alt="dataReactive.title">
                    </div>
                    </div>
                    
                </div>
            </div>
        </div>
    <div>
        <h2 
        class="text-3xl font-bold uppercase text-gray-200 -mb-[2rem]">
        {{ ganador }}
    </h2>
    <button 
        @click="handleModalResult" class="bg-[#3b42629b] text-2xl font-bold rounded-lg text-white px-10 py-3 m-10">Play Again
    </button>
    </div>
    </div>

    <div 
    v-if="gameOver"
    class="absolute top-0 bg-black text-white h-[100vh] w-[100%] absolute top-0 text-center flex flex-col items-center justify-center z-[10000]">
        <h2 class="text-3xl uppercase">Game Over</h2>
        <button 
        @click="gameOver = false"
        class="text-blue-100 hover:text-blue-300">Play Again</button>
    </div>

    
</template>


<script setup>
import { computed, ref, reactive } from 'vue';
import { useStore } from 'vuex';

const store = useStore();



const player = computed(() => store.state.btnSelected);
const computerSelection = ref('');
const scorePlayer = computed(() => store.state.playerScore);
const modalResult = computed(() => store.state.modalWinner);


const handleModalResult = () => {
    store.commit('setBtnSelected', '');
    store.commit('setModalWinner', false)
}


const options = [ {
    title: 'rock',
    url: 'icon-rock.svg',
    classes: 'bg-white w-[6rem] h-[6rem] rounded-full border-[12px] border-[#D3405A]  p-2 transition-all duration-[0.3s]' 
},
{
    title: 'paper',
    url: 'icon-paper.svg',
    classes: "bg-white w-[6rem] h-[6rem] rounded-full border-[12px] border-[#546EE4] p-2 transition-all duration-[0.3s] "
},
{
    title: 'scissors',
    url: 'icon-scissors.svg',
    classes: "bg-white w-[6rem] h-[6rem] rounded-full border-[12px] border-[#DF9E20] p-2  transition-all duration-[0.3s]"
}]

const optionsComputer = [ {
    title: 'rock',
    url: 'icon-rock.svg',
    classes: 'bg-white w-[6rem] h-[6rem] rounded-full border-[12px] border-[#D3405A]  p-2 transition-all duration-[0.3s]' 
},
{
    title: 'paper',
    url: 'icon-paper.svg',
    classes: "bg-white w-[6rem] h-[6rem] rounded-full border-[12px] border-[#546EE4] p-2 transition-all duration-[0.3s] "
},
{
    title: 'scissors',
    url: 'icon-scissors.svg',
    classes: "bg-white w-[6rem] h-[6rem] rounded-full border-[12px] border-[#DF9E20] p-2  transition-all duration-[0.3s]"
}]

const getRamdomSelection = () => {
    const opcciones = [ 'rock', 'paper', 'scissors']
    let index = Math.floor(Math.random() * opcciones.length);
    return  opcciones[index];
}
computerSelection.value = getRamdomSelection();
console.log('computerSelection es : ', computerSelection.value);


const piedra = options[0].title
const papel = options[1].title
const tijera = options[2].title

console.log(piedra, papel, tijera);

const dataReactive = reactive({
    img :'',
    title :'',
    clasesPlayer :'',
    titleComputer :'',
    imgComputer :'',
    classesComputer: '',
})

const baseUrl = import.meta.env.BASE_URL + "src/assets/images/"


if (player.value === piedra){
    dataReactive.clasesPlayer = options[0].classes
    dataReactive.title = options[0].title
    dataReactive.img = baseUrl + options[0].url
} 

else if (player.value  === papel){
    dataReactive.clasesPlayer = options[1].classes
    dataReactive.title = options[1].title
    dataReactive.img = baseUrl + options[1].url
} 

else if (player.value === tijera){
    dataReactive.clasesPlayer = options[2].classes
    dataReactive.title = options[2].title
    dataReactive.img = baseUrl + options[2].url
}


if (computerSelection.value === piedra){
    
    dataReactive.classesComputer = optionsComputer[0].classes
    dataReactive.titleComputer = optionsComputer[0].title
    dataReactive.imgComputer = baseUrl + options[0].url
} 

else if (computerSelection.value === papel) {
    dataReactive.classesComputer = optionsComputer[1].classes
    dataReactive.titleComputer = optionsComputer[1].title
    dataReactive.imgComputer = baseUrl + options[1].url

} else if (computerSelection.value === tijera) {
    dataReactive.classesComputer = optionsComputer[2].classes
    dataReactive.titleComputer = optionsComputer[2].title
    dataReactive.imgComputer = baseUrl + options[2].url
}

const determineWinner =  () =>  {
    if (player.value === computerSelection.value){
        return 'empate'
    } else if (player.value === 'rock' && computerSelection.value === 'scissors' || player.value === 'paper' && computerSelection.value === 'rock' || player.value === 'scissors' && computerSelection.value === 'paper'){
        

        setTimeout(() => {
            const audioScore = new Audio();
            audioScore.src = 'score.mp3';
            audioScore.load();
            audioScore.play();
            store.commit('setPlayerScore', store.state.playerScore + 1)
        },2000)
        
        return 'you win'
    } else {
        store.commit('setPlayerScore', store.state.playerScore - 1)
        return 'you lose'
        
    }
}

const ganador = determineWinner();
console.log('ganador es : ', ganador);

const gameOver = ref(false);
if (scorePlayer.value === 0){
    gameOver.value = true
}
if (scorePlayer.value === 0){
    gameOver.value = true
}

</script>

<style scoped>
.shadow{
    border-radius: 50%;
    box-shadow: 0 0 5px 0.1rem #909090bf;
}
</style>