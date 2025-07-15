<template>
  <div>
    <Dialog :open="showForm" @update:open="emit('update:open', $event)">
      <DialogContent class="sm:max-w-[725px] bg-white ">
        <DialogHeader>
          <DialogTitle>{{ $t('partner') }}</DialogTitle>
          <DialogDescription>
            {{ $t('banner_form_desc') }}
          </DialogDescription>
        </DialogHeader>

        <form @submit.prevent="onHandleSummitForm" class="space-y-4">
          <Tabs default-value="KHMER" class="w-full">
            <TabsList>
              <TabsTrigger value="KHMER">
                {{ $t("khmer") }}
              </TabsTrigger>
              <TabsTrigger value="ENGLISH">
                {{ $t("english") }}
              </TabsTrigger>
            </TabsList>
            <TabsContent value="KHMER">
              <div class="grid grid-cols-3 gap-4 py-4">
                <div class="col-span-2">
                  <!-- Name Field -->
                  <div class="flex flex-col items-start justify-center mb-4">
                    <Label for="name" class="text-left mb-1">{{
                      $t("name_kh")
                      }}</Label>
                    <Input id="name" v-model="partner.kh.name" required class="col-span-3" />
                  </div>
                  <!-- Description Field -->
                  <div class="flex flex-col items-start justify-center">
                    <Label for="description" class="text-left mb-1">{{
                      $t("description_kh")
                      }}</Label>
                    <Textarea id="description" rows="10" required v-model="partner.kh.description" class="col-span-3" />
                  </div>
                </div>

                <div>
                  <div class="flex flex-col items-start justify-center mb-3">
                    <Label for="image" class="text-left mb-1">{{
                      $t("preview")
                      }}</Label>
                    <div class="h-[14rem] w-[14rem] border rounded-md flex justify-center items-center">
                      <img v-if="previewImage" :src="previewImage" alt="Partner Logo"
                        class="w-[9rem] h-auto object-cover bg-cover rounded-md transition-transform duration-300 hover:scale-105" style="object-position: top;" />
                    </div>
                  </div>
                  <!-- Image URL Field -->
                  <div class="flex flex-col items-start justify-center mb-3">
                    <Label for="image" class="text-left mb-1">{{
                      $t("upload_image")
                      }}</Label>
                    <Input id="image" type="file" :required="!previewImage" @onChange="handleFileInput"
                      @input="handleFileInput" class="col-span-3" accept="image/jpeg,image/png,image/gif" />
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="ENGLISH">
              <div class="grid grid-cols-3 gap-4 py-4">
                <div class="col-span-2">
                  <!-- Name Field -->
                  <div class="flex flex-col items-start justify-center mb-4">
                    <Label for="name" class="text-left mb-1">{{
                      $t("name")
                      }}</Label>
                    <Input id="name" v-model="partner.en.name" required class="col-span-3" />
                  </div>
                  <!-- Description Field -->
                  <div class="flex flex-col items-start justify-center">
                    <Label for="description" class="text-left mb-1">{{
                      $t("description")
                      }}</Label>
                    <Textarea id="description" rows="10" required v-model="partner.en.description" class="col-span-3" />
                  </div>
                </div>
                <div>
                  <div class="flex flex-col items-start justify-center mb-3">
                    <Label for="image" class="text-left mb-1">{{
                      $t("preview")
                      }}</Label>
                    <div class="h-[14rem] w-[14rem] border rounded-md flex justify-center items-center">
                      <img v-if="previewImage" :src="previewImage" alt="Partner Logo"
                        class="w-[9rem] h-auto object-cover bg-cover rounded-md transition-transform duration-300 hover:scale-105" style="object-position: top;" />
                    </div>
                  </div>
                  <!-- Image URL Field -->
                  <div class="flex flex-col items-start justify-center mb-3">
                    <Label for="image" class="text-left mb-1">{{
                      $t("upload_image")
                      }}</Label>
                    <Input id="image" type="file" :required="!previewImage" @onChange="handleFileInput"
                      @input="handleFileInput" class="col-span-3" accept="image/jpeg,image/png,image/gif" />
                  </div>
                </div>
              </div>
            </TabsContent>
            <div>
              <Label for="name" class="text-left mb-1">{{
                $t("website_url")
                }}</Label>
              <Input id="name" v-model="partner.url" required class="col-span-3" />
            </div>
          </Tabs>

          <DialogFooter>
            <Button type="button" variant="outline" @click="$emit('closeForm')">
              Cancel
            </Button>
            <Button type="submit" variant="outline">{{ $t("save") }}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, inject } from "vue";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from ".././ui/tabs/index.ts";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from ".././ui/dialog";
import { Button } from ".././ui/button";
import { Input } from ".././ui/input";
import { Label } from ".././ui/label";
import { Textarea } from ".././ui/textarea";
import { useToast } from ".././ui/toast/use-toast";
import { useI18n } from 'vue-i18n'
import type PartnerModel from '@/scripts/model/partner/PartnerModel.ts'
import { createPartner } from '@/scripts/model/partner/PartnerModel.ts'
import { createPartnerHandler, updatePartnerHandler } from '@/scripts/handler/partner/PartnerHandler.ts'
import { uploadFileHandler } from '../../scripts/handler/FileUploadHanlder.ts'
import type { Emitter } from 'mitt';

const props = defineProps({
  partner: {
    type: Object,
    required: true,
  },
  showForm: {
    type: Boolean,
    required: true,
    default: false
  }
})

const emitter = inject<Emitter<{ [event: string]: unknown }>>('emitter');
const { t } = useI18n()
const { toast } = useToast()

// Define Variable
const previewImage = ref<string>(props.partner.imageUrl)
const partner = ref<PartnerModel>(JSON.parse(JSON.stringify(props.partner)) as PartnerModel)
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
          partner.value.logo = data.url;
        } else {
          throw new Error('File upload failed');
        }
      } catch (error) {
        console.error(error);
        return;
      }
    }
    const action = status.value === "New" ? onHandleCreatePartner : onHandleUpdateBanner;
    await action();
  } catch (e) {
    console.log(e)
  }
}

const onHandleUpdateBanner = async () => {
  try {
    emitter?.emit("stateLoading", true);
    const { data,message, statusCode } = await updatePartnerHandler(partner.value as PartnerModel);
    
    if (statusCode == 200 && data) {
      emit('updateForm', {
        ...data,
        status: status.value
      })
      toast({
        description: t('update_partner_success'),
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

const onHandleCreatePartner = async () => {
  try {
    emitter?.emit("stateLoading", true);
    const { data,message, statusCode } = await createPartnerHandler(partner.value as PartnerModel);
    
    if (statusCode == 200 && data) {
      emit('updateForm', {
        ...data,
        status: status.value
      })
      toast({
        description: t('create_partner_success'),
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
  () => [props.partner, props.showForm],
  () => {
    if (props.partner && props.partner._id && props.partner._id) {
      partner.value = createPartner(JSON.parse(JSON.stringify(props.partner)) as PartnerModel)
      previewImage.value = partner.value.logo;
      status.value = "Update";
    } else {
      partner.value = createPartner();
      status.value = "New";
      previewImage.value = "";
    }
    showForm.value = props.showForm
  }, { immediate: true, })
</script>