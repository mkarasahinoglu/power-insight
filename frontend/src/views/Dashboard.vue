<template>
  <v-container class="d-flex justify-center align-start fill-height">
    <v-card v-if="auth.isLoggedin" class="mt-10"
    flat
    :title="$t('message.dashboard')"
    >
      <v-dialog v-model="dialog" max-width="700px" persistent>
        <template v-slot:activator="">
          <div class="d-flex justify-end pr-4">
            <v-icon size="xxx-large" @click="openDialog(-1)">mdi-plus-box</v-icon>
          </div> 
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5">{{ dialogTitle }}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-text-field v-model="editFactoryModel.name" :label="$t('message.factory')" variant="outlined"></v-text-field>
              <v-text-field v-model="editFactoryModel.membership_start_date" :label="$t('message.membershipSD')" variant="outlined"></v-text-field>
              <v-text-field v-model="editFactoryModel.membership_end_date" :label="$t('message.membershipED')" variant="outlined"></v-text-field>
              <v-text-field v-model="editFactoryModel.employee_count" :label="$t('message.employeeCount')" variant="outlined"></v-text-field>
              <v-select v-model="membershipType" :items="[$t('message.free'),$t('message.standard')]" :label="$t('message.membership')" variant="outlined">
              </v-select>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn  variant="outlined" @click="closeDialog">
              {{ $t("message.cancel") }}
            </v-btn>
            <v-btn color="black" variant="flat" @click="save" :loading="loadingDialog">
              {{ $t("message.save") }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialogDelete" max-width="350px">
        <v-card>
          <v-card-title class="text-center"
            >{{ $t("message.ensure") }}</v-card-title
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="black" variant="outlined" @click="closeDeleteDialog"
              >{{ $t("message.cancel") }}</v-btn
            >
            <v-btn
              color="black"
              variant="flat"
              @click="deleteFactory" :loading="loadingDialog"
              >{{ $t("message.delete") }}</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-divider></v-divider>
      <template v-slot:text>
        <v-text-field
          v-model="search"
          :label="$t('message.search')"
          prepend-inner-icon="mdi-magnify"
          single-line
          variant="outlined"
          hide-details
        ></v-text-field>
      </template>
      <v-data-table fixed-header hover :loading="loading" show-current-page
        :headers="headers"
        :items="factories"
        :search="search"
        :items-per-page-text="$t('message.itemsPerPageText')"
        :loading-text="$t('message.loading')"
        :no-data-text="$t('message.noDataAvailable')"
      >
        <template v-slot:item.free_membership="{ item }">
          <div class="text-start">
            <v-chip
              :color="item.free_membership ? 'success' : 'black'"
              :text="item.free_membership  ? $t('message.free') : $t('message.standard')"
              class="text-uppercase"
              label
              size="small"
            ></v-chip>
          </div>
        </template>
        <template v-slot:item.actions="{ item }">
          <div class="mr-5">
            <v-icon class="ma-1" size="large" @click="openDialog(item)">mdi-pencil</v-icon>
            <v-icon class="ma-1" size="large" @click="showDetails(item.name)">mdi-information</v-icon>
            <v-icon class="ma-1" size="large" @click="openDeleteDialog(item.id)">mdi-delete</v-icon>
          </div>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script setup>
  import { authStore } from '@/store/auth'
  import { factoryStore } from '@/store/factory'
  import { ref, onMounted } from 'vue'
  import { i18n } from '@/plugins/i18n'
  import { computed } from 'vue'
  import { reactive } from 'vue'
  import router from '@/router'
  const { t } = i18n.global
  const factory = factoryStore()
  const auth = authStore()
  const factories = ref([])
  const loading = ref(false)
  const loadingDialog = ref(false)
  const search = ref("")
  const membershipType = ref("")
  const factoryId = ref(-1)
  const dialog = ref(false)
  const dialogDelete = ref(false)

  let editFactoryModel = ref({
    name: "",
    membership_start_date: "",
    membership_end_date: "",
    employee_count: "",
    free_membership: ""
  })

  const defaultFactoryModel = {
    name: "",
    membership_start_date: "",
    membership_end_date: "",
    employee_count: "",
    free_membership: ""
  }

  const headers = ref([
    { key: 'name', title: t("message.factory") },
    { key: 'membership_start_date', title: t("message.membershipSD") },
    { key: 'membership_end_date', title: t("message.membershipED") },
    { key: 'employee_count', title: t("message.employeeCount") },
    { key: 'free_membership', title: t("message.membership") },
    { key: 'actions', title: '', align: 'center', sortable: false }
  ])

  onMounted(async ()=> {
    await getFactories()
  })

  const showDetails = (factoryName) => { 
    router.push(`/dashboard/${factoryName}/details`)
  }

  const dialogTitle = computed(() => {
      return factoryId.value === -1 ? t("message.add") : t("message.edit")
    } 
  )

  const getFactories = async () => {
    loading.value = true
    factories.value = await factory.getFactories()
    loading.value = false
  }

  const updateFactory = async () => {
    loadingDialog.value = true
    editFactoryModel.free_membership = membershipType.value === t("message.free") ? true : false
    const updatedFactory = await factory.updateFactory(factoryId, editFactoryModel)
    loadingDialog.value = false
    if(updatedFactory) {
      await getFactories()
      return true
    }
    else {
      return false
    }
  }

  const createFactory = async () => {
    loadingDialog.value = true
    editFactoryModel.free_membership = membershipType.value === t("message.free") ? true : false
    const createdFactory = await factory.createFactory(editFactoryModel)
    loadingDialog.value = false
    if(createdFactory) {
      await getFactories()
      return true
    } else {
      return false
    }
  }

  const deleteFactory = async () => {
    loadingDialog.value = true
    const deletedFactory = await factory.deleteFactory(factoryId.value)
    loadingDialog.value = false
    if(deletedFactory) {
      await getFactories()
      closeDeleteDialog()
    }
  }

  const closeDialog = () => {
    dialog.value = false
    editFactoryModel = reactive({...defaultFactoryModel})
    membershipType.value = ""
    factoryId.value = -1
  }

  const openDialog = (itemOrIndex) => {
    if(itemOrIndex === -1) {
      editFactoryModel = reactive({...defaultFactoryModel})
      membershipType.value = ""
      factoryId.value = -1
    }
    else {
      editFactoryModel = reactive({...itemOrIndex})
      membershipType.value = editFactoryModel.free_membership ? t("message.free") : t("message.standard") 
      factoryId.value = itemOrIndex.id
    }
    dialog.value =true
  }

  const closeDeleteDialog = () => {
    dialogDelete.value = false
    factoryId.value = -1
  }

  const openDeleteDialog = (factoryIndex) => {
    dialogDelete.value = true
    factoryId.value = factoryIndex
  }

  const save = async () => {
    let res = false
    if(factoryId.value === -1) {
      res = await createFactory()
    }
    else {
      res = await updateFactory()
    }
    if(res) {
      closeDialog()
    }
  }
</script>