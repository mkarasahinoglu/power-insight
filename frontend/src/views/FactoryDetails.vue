<template>
  <v-container class="d-flex align-start justify-center fill-height">
    <v-card v-if="auth.isLoggedin" class="mt-10" :title="$t('message.factoryDetails')">
      <template v-slot:subtitle>
        <v-chip color="success" style="font-weight: 600;" label>{{ route.params.factoryName }}</v-chip>
      </template>
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
              <v-text-field v-model="editFactoryDetailsModel.using_unit" :label="$t('message.usingUnit')" variant="outlined"></v-text-field>
              <v-text-field v-model="editFactoryDetailsModel.date_range" :label="$t('message.dateRange')" variant="outlined"></v-text-field>
              <v-text-field v-model="editFactoryDetailsModel.usage_kw" :label="$t('message.usageKW')" variant="outlined"></v-text-field>
              <v-text-field v-model="editFactoryDetailsModel.usage_cost" :label="$t('message.usageCost')" variant="outlined"></v-text-field>
              <v-select v-model="discountType" :items="[$t('message.yes'),$t('message.no')]" :label="$t('message.discount')" variant="outlined">
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
              @click="deleteFactoryDetails" :loading="loadingDialog"
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
      :items="factoryDetailsArr"
      :search="search"
      :items-per-page-text="$t('message.itemsPerPageText')"
      :loading-text="$t('message.loading')"
      :no-data-text="$t('message.noDataAvailable')"
      >
        <template v-slot:item.discount="{ item }">
          <div class="text-start">
            <v-chip
              :color="item.discount ? 'success' : 'black'"
              :text="item.discount  ? $t('message.yes') : $t('message.no')"
              class="text-uppercase"
              label
              size="small"
            ></v-chip>
          </div>
        </template>
        <template v-slot:item.actions="{ item }">
          <div class="mr-5">
            <v-icon class="ma-1" size="large" @click="openDialog(item)">mdi-pencil</v-icon>
            <v-icon class="ma-1" size="large" @click="openDeleteDialog(item.id)">mdi-delete</v-icon>
          </div>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script setup>
  import { authStore } from '@/store/auth'
  import { ref, onMounted, computed, reactive } from 'vue'
  import { factoryStore } from '@/store/factory'
  import { factoryDetailsStore } from '@/store/factoryDetails'
  import { i18n } from '@/plugins/i18n'
  import { useRoute } from 'vue-router'
  const route = useRoute()
  const search = ref("")
  const loadingDialog = ref(false)
  const factoryDetailsId = ref(-1)
  const factoryId = ref(-1)
  const dialog = ref(false)
  const dialogDelete = ref(false)
  const discountType = ref("")
  const factory = factoryStore()
  const factoryDetails = factoryDetailsStore()
  const { t } = i18n.global
  const factoryDetailsArr = ref([])
  const loading = ref(false)
  const auth =authStore()

  let editFactoryDetailsModel = ref({
    using_unit: "",
    date_range: "",
    usage_kw: "",
    usage_cost: "",
    discount: ""
  })

  const defaultFactoryDetailsModel = {
    using_unit: "",
    date_range: "",
    usage_kw: "",
    usage_cost: "",
    discount: ""
  }

  const headers = ref([
    { key: 'using_unit', title: t("message.usingUnit") },
    { key: 'date_range', title: t("message.dateRange") },
    { key: 'usage_kw', title: t("message.usageKW") },
    { key: 'usage_cost', title: t("message.usageCost") },
    { key: 'discount', title: t("message.discount") },
    { key: 'actions', title: '', align: 'center', sortable: false }
  ])

  const dialogTitle = computed(() => {
      return factoryDetailsId.value === -1 ? t("message.add") : t("message.edit")
    } 
  )

  onMounted(async() => {
    await getFactoryDetails()
  })

  const getFactoryDetails = async () => {
    loading.value = true
    const factories = await factory.getFactories()
    const factoryName = route.params.factoryName
    const foundFactory = factories.find(factory => factory.name === factoryName)
    if(foundFactory) {
      factoryDetailsArr.value = await factoryDetails.getFactoryDetails(foundFactory.id)
      factoryId.value = foundFactory.id
    }
    loading.value = false
  }

  const updateFactoryDetails = async () => {
    loadingDialog.value = true
    editFactoryDetailsModel.discount = discountType.value === t("message.yes") ? true : false
    const updatedFactoryDetails = await factoryDetails.updateFactoryDetails(factoryId, factoryDetailsId, editFactoryDetailsModel)
    loadingDialog.value = false
    if(updatedFactoryDetails) {
      await getFactoryDetails()
      return true
    }
    else {
      return false
    }
  }

  const createFactoryDetails = async () => {
    loadingDialog.value = true
    editFactoryDetailsModel.discount = discountType.value === t("message.free") ? true : false
    const createdFactoryDetails = await factoryDetails.createFactoryDetails(factoryId, editFactoryDetailsModel)
    loadingDialog.value = false
    if(createdFactoryDetails) {
      await getFactoryDetails()
      return true
    } else {
      return false
    }
  }

  const deleteFactoryDetails = async () => {
    loadingDialog.value = true
    const deletedFactoryDetails = await factoryDetails.deleteFactoryDetails(factoryId.value, factoryDetailsId.value)
    loadingDialog.value = false
    if(deletedFactoryDetails) {
      await getFactoryDetails()
      closeDeleteDialog()
    }
  }
  
  const closeDialog = () => {
    dialog.value = false
    editFactoryDetailsModel = reactive({...defaultFactoryDetailsModel})
    discountType.value = ""
    factoryDetailsId.value = -1
  }

  const openDialog = (itemOrIndex) => {
    if(itemOrIndex === -1) {
      editFactoryDetailsModel = reactive({...defaultFactoryDetailsModel})
      discountType.value = ""
      factoryDetailsId.value = -1
    }
    else {
      editFactoryDetailsModel = reactive({...itemOrIndex})
      discountType.value = editFactoryDetailsModel.discount ? t("message.yes") : t("message.no") 
      factoryDetailsId.value = itemOrIndex.id
    }
    dialog.value =true
  }

  const closeDeleteDialog = () => {
    dialogDelete.value = false
    factoryDetailsId.value = -1
  }

  const openDeleteDialog = (factoryDetailsIndex) => {
    dialogDelete.value = true
    factoryDetailsId.value = factoryDetailsIndex
  }

  const save = async () => {
    let res = false
    if(factoryDetailsId.value === -1) {
      res = await createFactoryDetails()
    }
    else {
      res = await updateFactoryDetails()
    }
    if(res) {
      closeDialog()
    }
  }
</script>