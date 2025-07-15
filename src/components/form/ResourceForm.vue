<template>
  <div>
    <Dialog :open="showForm" @update:open="emit('update:open', $event)">
      <DialogContent class="sm:max-w-[700px] bg-white ">
        <DialogHeader>
          <DialogTitle>{{ $t('resource') }}</DialogTitle>
          <DialogDescription>
            {{ $t('resource_form_desc') }}
          </DialogDescription>
        </DialogHeader>
        <form @submit.prevent="onHandleSummitForm" class="space-y-4">
          <div class="grid grid-cols-3 gap-4 py-4">
            <div class="col-span-2">
              <div>
                <!-- Name Field -->
                <div class="flex flex-col items-start justify-center mb-4">
                  <Label class="text-left mb-1">{{ $t('title') }}</Label>
                  <Textarea rows="4" v-model="resource.title" :rules="[validationRules.required]" required class="col-span-3" />
                </div>
                <!-- Description Field -->
                <div class="grid grid-cols-2 gap-2">
                  <!-- Nationality Field -->
                  <div class="flex flex-col items-start justify-center mb-4">
                    <Label class="text-left mb-1">{{ $t('resource_type') }}</Label>
                    <ResourceTypeSelection :initResourceType="resourceType"
                      @resourceTypeChange="handleResourceTypeChange" />
                  </div>
                  <div class="flex flex-col items-start justify-center mb-4" v-if="resourceType == 'admin'">
                    <Label class="text-left mb-1">{{ $t('resource_sub_type') }}</Label>
                    <SubTypeOfAdmin :initResourceSubType="resourceSubType" @resourceSubTypeChange="resource.sub_type = $event" />
                  </div>
                </div>
                <!-- Position -->
                <div class="grid grid-cols-2 gap-2">
                  <div class="flex flex-col items-start justify-center mb-3">
                  <Label class="text-left mb-1">{{ $t('ministry') }}</Label>
                  <keep-alive>
                    <MinistrySelection :ministryList="ministryList" :initMinistry="resource_id"
                      @ministryChange="handleMinistryChange" />
                  </keep-alive>
                </div>
                <div class="flex flex-col items-start justify-center mb-4">
                  <Label class="text-left mb-1">{{ $t('resource_language') }}</Label>
                  <ResourceLangSelection :initResourceLang="resourceLang"
                    @resourceLangChange="handleResourceLangChange" />
                </div>
                </div>

                <div class="flex flex-col justify-center items-start mb-3 col-span-1">
                  <Label class="text-left mb-1">{{ $t('file_resource_upload') }}</Label>
                  <ResourceFileForm :showForm="showFileForm" :initialFiles="resource.file" @uploadComplete="resource.file = $event" />
                  <div v-if="resource.file.length > 0" class="flex flex-col justify-center items-start mt-3 col-span-1">
                    <Label class="text-left mb-1 text-green-600">{{ $t('resource_file_existed') }}</Label>
                  </div> 
                </div>

              </div>
            </div>

            <div class="">
              <!-- Preview -->
              <div class="flex flex-col items-start justify-center mb-3">
                <Label class="text-left mb-1">{{ $t('preview') }}</Label>
                <div class="h-[30vh] w-full border rounded-md">
                  <img v-if="previewImage" :src="previewImage" alt="Partner Logo"
                    class="w-full h-full  object-cover bg-cover rounded-md" style="object-position: top;">
                </div>
              </div>
              <!-- Upload Image -->
              <div class="flex flex-col justify-center items-start float-right mb-3 col-span-1 w-full">
                <Label class="text-left mb-1">{{ $t('upload_cover') }}</Label>
                <Input type="file" :required="!previewImage" @onChange="handleFileInput" @input="handleFileInput"
                  class=" col-span-3" accept="image/jpeg,image/png,image/gif" />
              </div>
            </div>
          </div>


          <DialogFooter>
            <Button type="button" variant="outline" @click="$emit('closeForm', false)">
              Cancel
            </Button>
            <Button type="submit" variant="outline">{{ $t('save') }}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineAsyncComponent, onMounted, inject, computed } from 'vue'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog/index.ts'
import { Button } from '../ui/button/index.ts'
import { Input } from '../ui/input/index.ts'
import { Label } from '../ui/label/index.ts'
import { Textarea } from '../ui/textarea/index.ts'

import { validationRules } from '../../utils/validationRule.ts'
import type { Emitter } from 'mitt';
import { retriveMinistryHandler, } from '../../scripts/handler/ministry/MinistryHandler.ts'
import { createResource } from '../../scripts/model/resource/ResourceModel.ts'
import { createResourceHandler, updateResourceHandler } from '../../scripts/handler/resource/ResourceHandler.ts'
import { uploadFileHandler } from '../../scripts/handler/FileUploadHanlder.ts'
import { toast } from '../ui/toast/use-toast.ts'
import { useI18n } from 'vue-i18n'
import type ResourceModel from '../../scripts/model/resource/ResourceModel.ts'
import type MinistryModel from '../../scripts/model/ministry/MinistryModel.ts'
import SubTypeOfAdmin from '../selection/SubTypeOfAdmin.vue'

// Components
const MinistrySelection = defineAsyncComponent(() => import('../selection/Ministry.vue'))
const ResourceTypeSelection = defineAsyncComponent(() => import('../selection/ResourceType.vue'))
const ResourceLangSelection = defineAsyncComponent(() => import('../selection/ResourceLang.vue'))
const ResourceFileForm = defineAsyncComponent(() => import('./ResourceFileForm.vue'))

// Define Props
const props = defineProps({
  resource: {
    type: Object,
    required: true,
  },
  showForm: {
    type: Boolean,
    required: true,
    default: false
  }
})

// Define Variable
const { t } = useI18n();
const previewImage = ref<string>('')
const emitter = inject<Emitter<{ [event: string]: unknown }>>('emitter');
const resource = ref(JSON.parse(JSON.stringify(props.resource)) as ResourceModel)
const showForm = ref<boolean>(props.showForm)
const showFileForm = ref<boolean>(false)
const status = ref<string>("New")
const ministryList = ref<MinistryModel[]>([] as MinistryModel[])
const _file = ref<File | null>(null);
const _fileChange = ref<boolean>(false)
const _ministry = ref<any>('')
// Define props and emits
const emit = defineEmits(['update:open', 'updateForm', "closeForm"])


// Computed Properties
const resource_id = computed(() => {
  return (typeof resource.value.source == 'object') ? resource.value.source._id : resource.value.source
})

const resourceType = computed(() => {
  return resource.value.type || ''
})

const resourceSubType = computed(() => {
  return resource.value.sub_type || ''
})

const resourceLang = computed(() => {
  return resource.value.lang || ''
})


// Define methods
const handleMinistryChange = (ministry: string) => {
  if (ministry) {
    resource.value.source = ministry
  }
}

const handleResourceLangChange = (lang: string) => {
  if (lang) {
    resource.value.lang = lang
  }
}

const handleResourceTypeChange = (type: string) => {
  if (type) {
    resource.value.type = type
    if(resourceType.value !== 'admin') {
      resource.value.sub_type = ''
    }
  }
}

const onLoadMinistry = async () => {
  try {
    emitter?.emit("stateLoading", true);
    const { data, statusCode } = await retriveMinistryHandler();
    
    if (statusCode === 200) {
      ministryList.value = (data);
    }
  } catch (error) {
    console.error(error);
  } finally {
      emitter?.emit("stateLoading", false);
  }
};



const handleFileInput = (event: { target: { files: any[]; }; }) => {
  const file = event.target.files[0]
  const reader = new FileReader()
  reader.onload = () => {
    previewImage.value = reader.result as string
    _file.value = file as File
    _fileChange.value = true
  }
  reader.readAsDataURL(file)
}

const onValidationOfResource = async ()  => {
  if (resource.value.file && resource.value.file.length <= 0) {
    toast({ title: 'File is required', variant: 'warning' });
    return false
  }
  return true
}


const onHandleSummitForm = async () => {
  try {
    if(!await onValidationOfResource()) return

    resource.value.source = (typeof resource?.value?.source === 'object' ? resource?.value.source?._id : resource?.value?.source) || "";
    const filePromises = [];
    if (_fileChange.value && _file.value) {
      filePromises.push(uploadFileHandler(_file.value).then(({ data, statusCode }) => {
        if (statusCode === 200 && data?.url) {
          resource.value.cover = data.url;
        } else {
          throw new Error('File upload failed');
        }
      }));
    }

    try {
      await Promise.all(filePromises);
    } catch (error) {
      console.error(error);
      return;
    }
    const action = status.value === "New" ? onHandleCreateResource : onHandleUpdateResource;
    await action();
  } catch (e) {
    console.log(e)
  }
}

const onHandleUpdateResource = async () => {
  try {
    emitter?.emit("stateLoading", true);
    const { data, message, statusCode } = await updateResourceHandler(resource.value as ResourceModel);
    
    if (statusCode == 200 && data) {
      emit('updateForm', {
        ...data,
        position: _ministry.value,
        status: status.value
      })
      toast({
        description: t('update_resource_success'),
        variant: 'success',
        title: t("success"),
      });
      emit('closeForm')
    }else{
      toast({ title: 'Something went wrong', description: message, variant: 'warning' });
    }
  } catch (e) {
    console.log(e)
  } finally {
      emitter?.emit("stateLoading", false);
  }
}

const onHandleCreateResource = async () => {
  try {
    emitter?.emit("stateLoading", true);
    const {  data, message, statusCode } = await createResourceHandler(resource.value as ResourceModel);
    
    if (statusCode == 200 && data) {
      emit('updateForm', {
        ...data,
        position: _ministry.value,
        status: status.value
      })
      toast({
        description: t('create_member_success'),
        variant: 'success',
        title: t("success"),
      });
      emit('closeForm')
    }else
    {
      toast({ title: 'Something went wrong', description: message, variant: 'warning' });

    }
  } catch (e) {
    console.log(e)
  } finally {
      emitter?.emit("stateLoading", false);
  }
}

// Define Lifecycle Hooks
onMounted(async () => {
  await onLoadMinistry()
})

// Define Watch
watch(
  () => [props.resource, props.showForm],
  () => {
    if (Object.keys(props.resource).length == 0) {
      resource.value = createResource();
      status.value = "New";
      previewImage.value = "";
      _ministry.value = ''
    } else {
      status.value = "Update";
      resource.value = createResource(JSON.parse(JSON.stringify(props.resource)) as ResourceModel)
      previewImage.value = (resource.value.cover);
      if (previewImage.value && !previewImage.value.includes("https://")) {
        previewImage.value = "https://" + previewImage.value;
      }
      _ministry.value = resource.value.source
    }
    showForm.value = props.showForm
  }, { immediate: true, deep: true })
</script>
