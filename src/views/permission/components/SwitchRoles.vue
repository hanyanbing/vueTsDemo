<template>
  <div>
    <div style="margin-bottom:15px;">
      {{ $t('permission.roles') }}： {{ roles }}
    </div>
    {{ $t('permission.switchRoles') }}：

    <el-radio-group v-model="switchRoles" @change="changeRoles()">
      <el-radio-button label="editor" />
      <el-radio-button label="admin" />
    </el-radio-group>
  </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      roles: state => state.user.roles
    }),
    // roles() {
    //   return this.$store.getters.roles
    // },
    switchRoles: {
      get() {
        return this.roles[0]
      },
      set(val) {
        this.$store.dispatch('user/changeRoles', val).then(() => {
          this.$emit('change')
        })
      }
    }
  },

  methods:{
    changeRoles(){
      console.log('abc');
    }
  }
}
</script>
