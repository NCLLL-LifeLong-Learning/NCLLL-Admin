<template>
  <div>
    <Dialog :open="showForm" @update:open="emit('update:open', $event)">
      <DialogContent class="sm:max-w-[625px] bg-white ">
        <DialogHeader>
          <DialogTitle>{{ $t('sponsor') }}</DialogTitle>
          <DialogDescription>
            {{ $t('sponsor_form_desc') }}
          </DialogDescription>
        </DialogHeader>

        <form @submit.prevent="onHandleSummitForm" class="space-y-4">
          <div class="grid grid-cols-2 gap-4 py-4">
            <div>
              <!-- Name Field -->
              <div class="flex flex-col items-start justify-center mb-4">
                <Label for="name" class="text-left mb-1">{{ $t('name') }}</Label>
                <Input rows="9" v-model="sponsor.en.name" required  :rules="[validationRules.required]" class="col-span-3" />
              </div>
              <!-- Description Field -->
              <div class="flex flex-col items-start justify-center mb-4">
                <Label for="name" class="text-left mb-1">{{ $t('description') }}</Label>
                <Textarea rows="6" v-model="sponsor.en.description" required :rules="[validationRules.required]" class="col-span-3" />
              </div>
            </div>
            <div>
              <div class="flex flex-col items-start justify-center mb-3">
                <Label for="image" class="text-left mb-1">{{ $t('preview') }}</Label>
                <div class="h-[8.2rem] w-full border rounded-md">
                  <img v-if="previewImageEN" :src="previewImageEN" alt="banner Logo"
                    class="w-full h-full  object-cover bg-cover rounded-md">
                </div>
              </div>
              <!-- Image URL Field -->
              <div class="flex flex-col items-start justify-center mb-3">
                <Label for="image" class="text-left mb-1">{{ $t('upload_image') }}</Label>
                <Input id="image" type="file" :required="!previewImageEN" @onChange="handleFileInput" @input="handleFileInput" class="col-span-3"
                  accept="image/jpeg,image/png,image/gif" />
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
} from '../ui/dialog/index.ts'
import { Button } from '../ui/button/index.ts'
import { Input } from '../ui/input/index.ts'
import { Textarea } from '../ui/textarea/index.ts'
import { Label } from '../ui/label/index.ts'
import { useToast } from '../ui/toast/use-toast.ts'
import { useI18n } from 'vue-i18n'
import type SponsorModel from '../../scripts/model/sponsor/SponsorModel.ts'
import { createSponsor } from '../../scripts/model/sponsor/SponsorModel.ts'
import { createSponsorHandler, updateSponsorHandler } from '../../scripts/handler/sponsor/SponsorHandler.ts'
import { validationRules } from '@/utils/validationRule.ts'
import type { Emitter } from 'mitt';

const props = defineProps({
  sponsor: {
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
const previewImageEN = ref(props.sponsor?.en?.imageUrl)
// const previewImageKH = ref(props.sponsor?.kh?.imageUrl)
const sponsor = ref<SponsorModel>(JSON.parse(JSON.stringify(props.sponsor)) as SponsorModel) 
const showForm = ref<boolean>(props.showForm)
const status = ref<string>("New")

// Define props and emits
const emit = defineEmits(['update:open','updateForm', "closeForm"])

// Define methods
const handleFileInput = (event: { target: { files: any[]; }; }) => {
  const file = event.target.files[0]
  const reader = new FileReader()
  reader.onload = () => {
    sponsor.value.en.imageUrl = reader.result as string
  }
  reader.readAsDataURL(file)
}

const onHandleSummitForm = async () => {
  if(status.value == "New") onHandleCreateSponsor()
  else onHandleUpdateBanner()
}

const onHandleUpdateBanner = async () => {
  try {
    emitter?.emit("stateLoading", true);
    const { data, statusCode } = await updateSponsorHandler(sponsor.value as SponsorModel);
    
    if (statusCode == 200 && data) {
      emit('updateForm', {
        ...data,
        status: status.value
      })
      toast({
        description: t('update_sponsor_success'),
        variant: 'success',
        title: t("success"),
      });
      emit('closeForm')
    }
  } catch (e) {
    console.log(e)
  } finally {
      emitter?.emit("stateLoading", false);
  }
}

const onHandleCreateSponsor = async () => {
  try {
    emitter?.emit("stateLoading", true);
    sponsor.value.en.imageUrl = "https://picsum.photos/512/513"
    sponsor.value.kh = sponsor.value.en
    const {data, statusCode } = await createSponsorHandler(sponsor.value as SponsorModel);
    
    if (statusCode == 200 && data) {
      emit('updateForm', {
        ...data,
        status: status.value
      })
      toast({
        description: t('create_sponsor_success'),
        variant: 'success',
        title: t("success"),
      });
      emit('closeForm')
    }
  } catch (e) {
    console.log(e)
  } finally {
      emitter?.emit("stateLoading", false);
  }
}

// Define Watch
watch(
  () => [props.sponsor, props.showForm],
  () => {
    if (props.sponsor && props.sponsor._id && props.sponsor._id) {
      sponsor.value = createSponsor(JSON.parse(JSON.stringify(props.sponsor)) as SponsorModel ); // Deep copy
      status.value = "Update";
    } else {
      sponsor.value = createSponsor();
      status.value = "New";
      previewImageEN.value = "";
    }
    showForm.value = props.showForm
  }, { immediate: true, })
</script>