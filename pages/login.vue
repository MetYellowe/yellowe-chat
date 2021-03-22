<template>
    <div 
        v-show="!$auth.loggedIn"
        style="
            padding:30px;
            font:50px sans-serif
        "
    >Hey there! Let's go to Log In</div>
</template>
