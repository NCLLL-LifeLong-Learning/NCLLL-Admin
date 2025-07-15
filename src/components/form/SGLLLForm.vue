<template>
  <div>
    <Dialog :open="showForm" @update:open="emit('update:open', $event)">
      <DialogContent class="sm:max-w-[1024px] bg-white ">
        <DialogHeader>
          <DialogTitle>{{ $t('member') }}</DialogTitle>
          <DialogDescription>
            {{ $t('member_form_desc') }}
          </DialogDescription>
        </DialogHeader>
        <form @submit.prevent="onHandleSummitForm">
          <div class="flex flex-col">
            <div class="flex flex-col gap-2 mb-2">
              <Label class="text-left mb-1">{{ $t('term') }}</Label>
              <Select v-model="sglll.term" required class="w-full ">
                <SelectTrigger>
                  <SelectValue :value="sglll.term" required :placeholder="$t('select_position')" />
                </SelectTrigger>
                <SelectContent class="bg-white max-h-[200px]">
                  <SelectGroup>
                    <SelectItem v-for="index in 50" :key="index" :value="index">
                      {{ index }}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <!-- Khmer -->
            <div class="col-span-1 flex flex-col items-center gap-2">
              <!-- Preview -->
              <div class="flex flex-col items-center justify-center mb-3 col-span-2 border w-full rounded-md">
                <Label class="text-left mb-1">{{ $t('preview') }}</Label>
                <div class="flex flex-col items-start justify-center mb-3 col-span-2">
                <div class="h-[12rem] w-full rounded-md">
                  <img v-if="previewImageKH" :src="previewImageKH" alt="Partner Logo"
                    class="w-full h-full  object-cover bg-cover rounded-md">
                </div>
              </div>
              </div>
              <!-- Upload Image -->
              <div class="flex justify-center items-end mb-3 col-span-1">
                <Input type="file" :required="!previewImageKH" @onChange="handleFileInput" @input="handleFileInput"
                  class=" col-span-3" accept="image/jpeg,image/png,image/gif" />
              </div>
            </div>

            <!-- English -->
            <div class="col-span-1 flex flex-col items-center gap-2">
              <!-- Preview -->
              <div class="flex flex-col items-center justify-center mb-3 col-span-2 border w-full rounded-md">
                <Label class="text-left mb-1">{{ $t('preview') }}</Label>
                <div class="flex flex-col items-start justify-center mb-3 col-span-2">
                <div class="h-[12rem] w-full rounded-md">
                  <img v-if="previewImageEN" :src="previewImageEN" alt="Partner Logo"
                    class="w-full h-full  object-cover bg-cover rounded-md">
                </div>
              </div>
              </div>
              <!-- Upload Image -->
              <div class="flex justify-center items-end mb-3 col-span-1">
                <Input type="file" :required="!previewImageEN" @onChange="handleFileInputEN" @input="handleFileInputEN"
                  class=" col-span-3" accept="image/jpeg,image/png,image/gif" />
              </div>
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
import { ref, watch, onMounted, inject } from 'vue'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog/index.ts'
import { Label } from '../ui/label/index.ts'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select/index.ts'
import  { Input } from "../ui/input/index.ts"
import { Button } from '../ui/button/index.ts'
import { updateGLLLTreeHandler, createSGLLLTreeHandler  } from '../../scripts/handler/member/MemberHandler.ts'
import { uploadFileHandler } from '../../scripts/handler/FileUploadHanlder.ts'
import { toast } from '../ui/toast/use-toast.ts'
import { useI18n } from 'vue-i18n'
import type { Emitter } from 'mitt';

// Define Props
const props = defineProps({
  sglllTreeList: {
    type: Array as () => any[],
    required: true
  },
  sglllTree: {
    type: Object,
    required: true,
  },
  showForm: {
    type: Boolean,
    required: true
  }
})

// Define Variable
const { t } = useI18n();
const previewImageKH = ref<string>('')
const previewImageEN = ref<string>('')
const emitter = inject<Emitter<{ [event: string]: unknown }>>('emitter');
const showForm = ref<boolean>(props.showForm)
const status = ref<string>("New")
const _file = ref<File | null>(null);
const _fileEN = ref<File | null>(null);
const _fileChange = ref<boolean>(false)
const _fileChangeEN = ref<boolean>(false)
const sglll = ref<any>(null)

//Temp
// Define props and emits
const emit = defineEmits(['update:open', 'updateForm', "closeForm"])

const handleFileInput = (event: { target: { files: any[]; }; }) => {
  const file = event.target.files[0]
  const reader = new FileReader()
  reader.onload = () => {
    previewImageKH.value = reader.result as string
    _file.value = file as File
    _fileChange.value = true
  }
  reader.readAsDataURL(file)
}

const handleFileInputEN = (event: { target: { files: any[]; }; }) => {
  const file = event.target.files[0]
  const reader = new FileReader()
  reader.onload = () => {
    previewImageEN.value = reader.result as string
    _fileEN.value = file as File
    _fileChangeEN.value = true
  }
  reader.readAsDataURL(file)
}

const onHandleSummitForm = async (e: Event) => {
  try {
    e.preventDefault();
    if (_fileChange.value && _file.value) {
      try {
        const { data, statusCode } = await uploadFileHandler(_file.value);

        if (statusCode === 200 && data?.url) {
          sglll.value.image_url_kh = data.url;
        } else {
          throw new Error('File upload failed');
        }
      } catch (error) {
        console.error(error);
        return;
      }
    }

    if (_fileChangeEN.value && _fileEN.value) {
      try {
        const { data, statusCode } = await uploadFileHandler(_fileEN.value);

        if (statusCode === 200 && data?.url) {
          sglll.value.image_url_en = data.url;
        }else {
          throw new Error('File upload failed');
        }
      } catch (error) {
        console.error(error);
        return;
      }
    }

    const action = status.value === "New" ? onHandleCreateMember : onHandleUpdateMember;
    await action();
  } catch (e) {
    console.log(e)
  }
}

const onHandleUpdateMember = async () => {
  try {
    emitter?.emit("stateLoading", true);
    const { data, message, statusCode } = await updateGLLLTreeHandler(sglll.value as any);
    
    if (statusCode == 200 && data) {
      emit('updateForm', {
        ...data,
        status: status.value
      })
      toast({
        description: t('update_sglll_success'),
        variant: 'success',
        title: t("success"),
      });
      emit('closeForm')
    } else {
      toast({ title: 'Something went wrong', description: message, variant: 'warning' });

    }
  } catch (e) {
    console.log(e)
  } finally {
      emitter?.emit("stateLoading", false);
  }
}

const onHandleCreateMember = async () => {
  try {
    emitter?.emit("stateLoading", true);
    const { message, data, statusCode } = await createSGLLLTreeHandler(sglll.value as any);
    if (statusCode == 200 && data) {
      emit('updateForm', {
        ...data,
        status: status.value
      })
      toast({
        description: t('create_sglll_success'),
        variant: 'success',
        title: t("success"),
      });
      emit('closeForm')
    } else {
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
})

// Define Watch
watch(
  () => [props.sglllTree, props.showForm],
  () => {
    if (Object.keys(props.sglllTree).length == 0) {
      status.value = "New";
      sglll.value = {
        term: 1,
        image_url_en: '',
        image_url_kh: '',
      }
      previewImageEN.value = "";
      previewImageKH.value = "";
    } else {
      status.value = "Update";
      previewImageEN.value = props.sglllTree.image_url_en
      previewImageKH.value = props.sglllTree.image_url_kh
      sglll.value = props.sglllTree
      sglll.value.id = props.sglllTree._id
    }
    showForm.value = props.showForm
  }, { immediate: true, deep: true })
</script>
