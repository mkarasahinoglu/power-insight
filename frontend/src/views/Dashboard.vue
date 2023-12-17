<template>
  <v-container class="d-flex justify-center align-start fill-height">

    <v-card v-if="auth.isLoggedin" class="mt-10"
    flat
    title="Dashboard"
  >
    <template v-slot:text>
      <v-text-field
        v-model="search"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        single-line
        variant="outlined"
        hide-details
      ></v-text-field>
    </template>

    <v-data-table fixed-header hover :loading="loading" loading-text="Loading" show-current-page
      :headers="headers"
      :items="factories"
      :search="search"
    >
      <template v-slot:item.free_membership="{ item }">
        <div class="text-center mr-6">
          <v-chip
            :color="item.free_membership ? 'success' : 'black'"
            :text="item.free_membership ? 'free' : 'standard'"
            class="text-uppercase"
            label
            size="small"
          ></v-chip>
        </div>
      </template>

      <template v-slot:item.actions="">
        <div class="mr-5">
          
          <v-icon class="ma-1">mdi-pencil</v-icon>
          <v-icon class="ma-1">mdi-information</v-icon>

        </div>
      </template>

    </v-data-table>
  </v-card>

  </v-container>
</template>

<script setup>
  import router from '@/router'
  import { authStore } from '@/store/auth'
  const auth = authStore()
  import { factoryStore } from '@/store/factory'
  const factory = factoryStore()
  import { ref, onMounted } from 'vue';

  let factories = ref([])
  let loading = ref(false)
  let search = ref("")

  const headers = ref([
    {     
      align: 'start',
      key: 'id',
      sortable: true,
      title: 'Id',
    },
    { key: 'name', title: 'Factory' },
    { key: 'membership_start_date', title: 'Membership Start Date' },
    { key: 'membership_end_date', title: 'Membership End Date' },
    { key: 'employee_count', title: 'Employees' },
    { key: 'free_membership', title: 'Membership' },
    { key: 'actions', title: '', align: 'center', sortable: false }
  ])

  onMounted(async ()=> {
    if(!auth.isLoggedin) {
      await router.push("/")
    }
    else {
      await getFactories()
    }
  })

  const getFactories = async () => {
    loading.value = true
    factories.value = await factory.getFactories()
    loading.value = false
  }
</script>