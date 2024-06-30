<template>
     <h3>{{ quiz.question }}</h3>

    <div class="control">
        <label class="radio">
            <input type="radio" :value="quiz.op1" v-model="selectedAnswer"> {{ quiz.op1 }}
        </label>
    </div>

    <div class="control">
        <label class="radio">
            <input type="radio" :value="quiz.op2" v-model="selectedAnswer"> {{ quiz.op2 }}
        </label>
    </div>

    <div class="control">
        <label class="radio">
            <input type="radio" :value="quiz.op3" v-model="selectedAnswer"> {{ quiz.op3 }}
        </label>
    </div>

    <div class="control mt-4">
        <button class="button is-info" @click="submitQuiz" >Submit</button>
    </div>

    <template v-if="quizResult == 'Correct'">
        <div class="notification is-success mt-4">Correct :D</div>
    </template>

    <template v-if="quizResult == 'Incorrect'">
        <div class="notification is-danger mt-4">Incorrect :( Try again! </div>
    </template>

</template>

<script>


export default {
    props: ['quiz'],

    data(){
        return {
            selectedAnswer: '',
            quizResult: null
        }
    },

    methods:{
        submitQuiz(){
            this.quizResult = null;

            if(this.selectedAnswer){

                if(this.selectedAnswer === this.quiz.answer){
                    this.quizResult = 'Correct';
                }else{
                    this.quizResult = 'Incorrect';
                }

            }else {
                alert('Please select an answer');
            }
        }
    },

}
</script>

<style>

</style>