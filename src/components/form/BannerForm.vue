<template>
  <div>
    <Dialog :open="showForm" @update:open="emit('update:open', $event)">
      <DialogContent class="sm:max-w-[625px] bg-white ">
        <DialogHeader>
          <DialogTitle>{{ $t('banner') }}</DialogTitle>
          <DialogDescription>
            {{ $t('banner_form_desc') }}
          </DialogDescription>
        </DialogHeader>

        <form @submit.prevent="onHandleSummitForm" class="space-y-4">
          <div class="grid grid-cols-2 gap-4 py-4">
            <div>
              <!-- Name Field -->
              <div class="flex flex-col items-start justify-center mb-4">
                <Label for="name" class="text-left mb-1">{{ $t('title') }}</Label>
                <Textarea rows="9" required :rules="[validationRules.required]" v-model="banner.title"
                  class="col-span-3" />
              </div>
            </div>

            <div>
              <div class="flex flex-col items-start justify-center mb-3">
                <Label for="image" class="text-left mb-1">{{ $t('preview') }}</Label>
                <div class="h-[8.2rem] w-full border rounded-md">
                  <img v-if="previewImage" :src="previewImage" alt="banner Logo"
                    class="w-full h-full  object-cover bg-cover rounded-md">
                </div>
              </div>
              <!-- Image URL Field -->
              <div class="flex flex-col items-start justify-center mb-3">
                <Label for="image" class="text-left mb-1">{{ $t('upload_image') }}</Label>
                <Input id="image" :required="!previewImage" type="file" @onChange="handleFileInput"
                  @input="handleFileInput" class="col-span-3" accept="image/jpeg,image/png,image/gif" />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" @click="$emit('closeForm')">
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
import { ref, watch, inject } from 'vue'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '.././ui/dialog'
import { Button } from '.././ui/button'
import { Input } from '.././ui/input'
import { Textarea } from '.././ui/textarea'
import { Label } from '.././ui/label'
import { useToast } from '.././ui/toast/use-toast'
import { useI18n } from 'vue-i18n'
import type BannerModel from '../../scripts/model/banner/BannerModel.ts'
import { createBanner } from '../../scripts/model/banner/BannerModel.ts'
import { validationRules } from '@/utils/validationRule'
import { createBannerHandler, updateBannerHandler } from '../../scripts/handler/banner/BannerHandler.ts'
import { uploadFileHandler } from '../../scripts/handler/FileUploadHanlder.ts'
import type { Emitter } from 'mitt';

const props = defineProps({
  banner: {
    type: Object,
    required: true,
  },
  showForm: {
    type: Boolean,
    required: true
  }
})

const emitter = inject<Emitter<{ [event: string]: unknown }>>('emitter');
const { t } = useI18n()
const { toast } = useToast()

// Define Variable
const previewImage = ref<string>(props.banner.imageUrl)
const banner = ref<BannerModel>(JSON.parse(JSON.stringify(props.banner)) as BannerModel)
const showForm = ref<boolean>(props.showForm)
const _file = ref<File | null>(null)
const _fileChanged = ref<boolean>(false)
const status = ref<string>("New")

// Define props and emits
const emit = defineEmits(['update:open', 'updateForm', "closeForm"])

// Define methods
const handleFileInput = (event: { target: { files: any[]; }; }) => {
  const file = event.target.files[0]
  const reader = new FileReader()
  reader.onload = () => {
    previewImage.value = reader.result as string
    _fileChanged.value = true
    _file.value = file
  }

  reader.readAsDataURL(file)
}

const onHandleSummitForm = async () => {
  try {
    if (_fileChanged.value && _file.value) {
      try {
        const { data, statusCode } = await uploadFileHandler(_file.value);

        if (statusCode === 200 && data?.url) {
          banner.value.imageUrl = data.url;
        } else {
          throw new Error('File upload failed');
        }
      } catch (error) {
        console.error(error);
        return;
      }
    }
    const action = status.value === "New" ? onHandleCreateBanner : onHandleUpdateBanner;
    await action();
  } catch (e) {
    console.log(e)
  }
}

const onHandleUpdateBanner = async () => {
  try {
    emitter?.emit("stateLoading", true);
    const { data, message,statusCode } = await updateBannerHandler(banner.value as BannerModel);
    if (statusCode == 200) {
      emit('updateForm', {
        ...data,
        status: status.value
      })
      toast({
        description: t('update_banner_success'),
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

const onHandleCreateBanner = async () => {
  try {
    emitter?.emit("stateLoading", true);
    const { data, message, statusCode } = await createBannerHandler(banner.value as BannerModel);
    if (statusCode == 200) {
      emit('updateForm', {
        ...data,
        status: status.value
      })
      toast({
        description: t('create_banner_success'),
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

// Define Watch
watch(
  () => [props.banner, props.showForm],
  () => {
    if (props.banner && props.banner._id && props.banner._id) {
      banner.value = createBanner(JSON.parse(JSON.stringify(props.banner)) as BannerModel)
      previewImage.value = props.banner.imageUrl;
      status.value = "Update";
    } else {
      banner.value = createBanner();
      status.value = "New";
      previewImage.value = "";
    }
    showForm.value = props.showForm
  }, { immediate: true, })
</script>