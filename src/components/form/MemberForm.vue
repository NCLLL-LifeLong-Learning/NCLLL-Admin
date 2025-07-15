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
        <form @submit.prevent="onHandleSummitForm" class="space-y-4" ref="memberForm">
          <Tabs default-value="KHMER" class="w-full">
            <TabsList>
              <TabsTrigger value="KHMER">
                {{ $t('khmer') }}
              </TabsTrigger>
              <TabsTrigger value="ENGLISH">
                {{ $t('english') }}
              </TabsTrigger>
            </TabsList>
            <TabsContent value="KHMER">
              <!-- KHMER FORM VERSION -->
              <div class="grid grid-cols-2 gap-4 py-4">
                <div>
                  <div>
                    <!-- Name Field -->
                    <div class="flex flex-col items-start justify-center mb-4">
                      <Label class="text-left mb-1">{{ $t('name_kh') }}</Label>
                      <Input v-model="member.kh.name" :rules="[validationRules.required]" required class="col-span-3" />
                    </div>
                    <!-- Description Field -->
                    <div  class="grid grid-cols-2 gap-2">
                      <div class="flex flex-col items-start justify-center mb-4">
                      <Label class="text-left mb-1">{{ $t('email') }}</Label>
                      <Input @change="member.en.email = member.kh.email.toLowerCase()" v-model="member.kh.email"
                        type="email" required :rules="[validationRules.required, validationRules.email]"
                        class="col-span-3" />
                    </div>
                    <div class=" mb-4">
                      <Label class="text-left mb-1">{{ $t('generation') }}</Label>
                      <Select v-model="member.generation" required class="w-full ">
                        <SelectTrigger>
                          <SelectValue :value="member.generation" required :placeholder="$t('select_position')" />
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
                    </div>
                    <div class="grid grid-cols-2 gap-2">
                      <!-- Nationality Field -->
                      <div class="flex flex-col items-start justify-center mb-4">
                        <Label class="text-left mb-1">{{ $t('nationality_kh') }}</Label>
                        <Input v-model="member.kh.nationality" :rules="[validationRules.required]" required
                          class="col-span-3 " />
                      </div>
                      <!-- Date of Birth -->
                      <div class="relative flex flex-col items-start justify-center mb-4">
                        <Label class="text-left mb-1">{{ $t('birth_date') }}</Label>
                        <VueDatePicker v-model="member.kh.birthDate" class="col-span-3 w-full" />
                        
                      </div>
                    </div>
                  </div>
                  <h1 class="mb-4 mt-3 font-bold">{{ $t('place_of_birth') }}</h1>
                  <div class="grid grid-cols-2 gap-2">
                    <div class="flex flex-col items-start justify-center ">
                      <Label class="text-left mb-1">{{ $t('house_number') }}</Label>
                      <Input v-model="member.kh.placeOfBirth.houseNumber" required :rules="[validationRules.required]"
                        class="col-span-3" />
                    </div>
                    <div class="flex flex-col items-start justify-center">
                      <Label class="text-left mb-1">{{ $t('street') }}</Label>
                      <Input v-model="member.kh.placeOfBirth.street" required :rules="[validationRules.required]"
                        class="col-span-3" />
                    </div>
                    <div class="flex flex-col col-span-2 items-start justify-center">
                      <Label class="text-left mb-1">{{ $t('district') }}</Label>
                      <Input v-model="member.kh.placeOfBirth.district" required :rules="[validationRules.required]"
                        class="col-span-3" />
                    </div>
                    <div class="flex flex-col items-start justify-center ">
                      <Label class="text-left mb-1">{{ $t('city') }}</Label>
                      <Input v-model="member.kh.placeOfBirth.city" required :rules="[validationRules.required]"
                        class="col-span-3" />
                    </div>
                    <div class="flex flex-col items-start justify-center">
                      <Label class="text-left mb-1">{{ $t('country') }}</Label>
                      <Input v-model="member.kh.placeOfBirth.country" required :rules="[validationRules.required]"
                        class="col-span-3" />
                    </div>
                  </div>
                </div>

                <div>
                  <div class="grid grid-cols-2 gap-2">
                    <!-- Position -->
                    <div class="flex flex-col items-start justify-start mb-3">
                      <Label class="text-left mb-1">{{ $t('position') }}</Label>
                      <keep-alive>
                        <PositionSelection :required="(position_id && position_id != '')" :positionList="positionList"
                          :initPosition="position_id" @positionChange="handlePositionChange" />
                      </keep-alive>
                    </div>
                    <!-- Position -->
                     <div class="flex flex-col items-center justify-center mb-3">
                      <Label class="text-left mb-1">{{ $t('preview') }}</Label>
                      <div class="h-[8rem] w-4/5 border rounded-md">
                        <img v-if="previewImage" :src="previewImage" alt="Partner Logo"
                          class="w-full h-full  object-cover bg-cover rounded-md" style="object-position: top;">
                      </div>
                    </div>
                  </div>
                  <div class="grid grid-cols-2 gap-2">
                    <!-- Preview -->
                    <div class="flex flex-col items-start justify-center mb-3">
                        <Label class="text-left mb-1">{{ $t('parent') }}</Label>
                        <keep-alive>
                          <MemberSelection :memberList="memberList" :initMember="member_parent_id"
                            :currentMember="current_member_id" @memberChange="handleMemberChange" />
                        </keep-alive>
                      </div>
                    
                    <!-- Upload Image -->
                    <div class="flex justify-center items-end mb-3 col-span-1">
                      <Input type="file" :required="!previewImage" @onChange="handleFileInput" @input="handleFileInput"
                        class=" col-span-3" accept="image/jpeg,image/png,image/gif" />
                    </div>
                  </div>
                  <div class="flex flex-col items-start justify-center mb-3 w-full">
                    <Label class="text-left mb-1">{{ $t('career_status') }}</Label>
                    <keep-alive>
                      <CareerStatus position_id
                        :required="(member.kh.careerStatus && member.kh.careerStatus.length == 0)" :showForm="showForm"
                        :careerStatusList="member.kh.careerStatus" @careerChange="member.kh.careerStatus = $event" />
                    </keep-alive>
                  </div>
                  <div class="flex flex-col items-start justify-center mb-3">
                    <Label class="text-left mb-1">{{ $t('experience') }}</Label>
                    <keep-alive>
                      <Experience :required="(member.kh.experience && member.en.experience.length == 0)"
                        :careerStatusList="member.kh.careerStatus" :showForm="showForm"
                        :experienceList="member.kh.experience" @experienceChange="member.kh.experience = $event" />
                    </keep-alive>
                  </div>
                </div>
              </div>


            </TabsContent>
            <TabsContent value="ENGLISH">
              <!-- KHMER FORM VERSION -->
              <div class="grid grid-cols-2 gap-4 py-4">
                <div>
                  <div>
                    <!-- Name Field -->
                    <div class="flex flex-col items-start justify-center mb-4">
                      <Label class="text-left mb-1">{{ $t('name') }}</Label>
                      <Input v-model="member.en.name" :rules="[validationRules.required]" required class="col-span-3" />
                    </div>
                    <!-- Description Field -->
                    <div  class="grid grid-cols-2 gap-2">
                      <div class="flex flex-col items-start justify-center mb-4">
                        <Label class="text-left mb-1">{{ $t('email') }}</Label>
                        <Input @change="member.kh.email = member.en.email.toLowerCase()" v-model="member.en.email"
                          type="email" required :rules="[validationRules.required, validationRules.email]"
                          class="col-span-3" />
                      </div>
                      <div class=" mb-4">
                        <Label class="text-left mb-1">{{ $t('generation') }}</Label>
                        <Select v-model="member.generation" required class="w-full ">
                          <SelectTrigger>
                            <SelectValue :value="member.generation" required :placeholder="$t('select_position')" />
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
                    </div>
                    <div class="grid grid-cols-2 gap-2">
                      <!-- Nationality Field -->
                      <div class="flex flex-col items-start justify-center mb-4">
                        <Label class="text-left mb-1">{{ $t('nationality') }}</Label>
                        <Input v-model="member.en.nationality" :rules="[validationRules.required]" required
                          class="col-span-3 " />
                      </div>
                      <!-- Date of Birth -->
                      <div class="relative flex flex-col items-start justify-center mb-4">
                        <Label class="text-left mb-1">{{ $t('birth_date') }}</Label>
                        <VueDatePicker v-model="member.en.birthDate" class="col-span-3 w-full" />
                      </div>
                    </div>
                  </div>
                  <h1 class="mb-4 mt-3 font-bold">{{ $t('place_of_birth_kh') }}</h1>
                  <div class="grid grid-cols-2 gap-2">
                    <div class="flex flex-col items-start justify-center ">
                      <Label class="text-left mb-1">{{ $t('house_number') }}</Label>
                      <Input v-model="member.en.placeOfBirth.houseNumber" required :rules="[validationRules.required]"
                        class="col-span-3" />
                    </div>
                    <div class="flex flex-col items-start justify-center">
                      <Label class="text-left mb-1">{{ $t('street') }}</Label>
                      <Input v-model="member.en.placeOfBirth.street" required :rules="[validationRules.required]"
                        class="col-span-3" />
                    </div>
                    <div class="flex flex-col col-span-2 items-start justify-center">
                      <Label class="text-left mb-1">{{ $t('district') }}</Label>
                      <Input v-model="member.en.placeOfBirth.district" required :rules="[validationRules.required]"
                        class="col-span-3" />
                    </div>
                    <div class="flex flex-col items-start justify-center ">
                      <Label class="text-left mb-1">{{ $t('city') }}</Label>
                      <Input v-model="member.en.placeOfBirth.city" required :rules="[validationRules.required]"
                        class="col-span-3" />
                    </div>
                    <div class="flex flex-col items-start justify-center">
                      <Label class="text-left mb-1">{{ $t('country') }}</Label>
                      <Input v-model="member.en.placeOfBirth.country" required :rules="[validationRules.required]"
                        class="col-span-3" />
                    </div>
                  </div>
                </div>

                <div>
                  <div class="grid grid-cols-2 gap-2">
                    <!-- Position -->
                    <div class="flex flex-col items-start justify-start mb-3">
                      <Label class="text-left mb-1">{{ $t('position') }}</Label>
                      <keep-alive>
                        <PositionSelection :positionList="positionList" :required="(position_id && position_id != '')"
                          :initPosition="position_id" @positionChange="handlePositionChange" />
                      </keep-alive>
                    </div>
                    <!-- Position -->
                    <div class="flex flex-col items-center justify-center mb-3">
                      <Label class="text-left mb-1">{{ $t('preview') }}</Label>
                      <div class="h-[8rem] w-4/5 border rounded-md">
                        <img v-if="previewImage" :src="previewImage" alt="Partner Logo"
                          class="w-full h-full  object-cover bg-cover rounded-md" style="object-position: top;">
                      </div>
                    </div>
                  </div>
                  <div class="grid grid-cols-2 gap-2">
                    <!-- Preview -->
                    <div class="flex flex-col items-start justify-center mb-3 col-span-1">
                      <Label class="text-left mb-1">{{ $t('parent') }}</Label>
                      <keep-alive>
                        <MemberSelection :memberList="memberList" :initMember="member_parent_id"
                          :currentMember="current_member_id" @memberChange="handleMemberChange" />
                      </keep-alive>
                    </div>
                    <!-- Upload Image -->
                    <div class="flex justify-center items-end mb-3 col-span-1">
                      <Input type="file" :required="!previewImage" @onChange="handleFileInput" @input="handleFileInput"
                        class=" col-span-3" accept="image/jpeg,image/png,image/gif" />
                    </div>
                  </div>

                  <div class="flex flex-col items-start justify-center mb-3 w-full">
                    <Label class="text-left mb-1">{{ $t('career_status') }}</Label>
                    <keep-alive>
                      <CareerStatus :required="(member.en.careerStatus && member.en.careerStatus.length == 0)"
                        :showForm="showForm" :careerStatusList="member.en.careerStatus"
                        @careerChange="member.en.careerStatus = $event" />
                    </keep-alive>
                  </div>
                  <div class="flex flex-col items-start justify-center mb-3">
                    <Label class="text-left mb-1">{{ $t('experience') }}</Label>
                    <keep-alive>
                      <Experience :required="(member.en.experience && member.en.experience.length == 0)"
                        :careerStatusList="member.en.experience" :showForm="showForm"
                        :experienceList="member.en.experience" @experienceChange="member.en.experience = $event" />
                    </keep-alive>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs/index.ts'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog/index.ts'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select'
import { Button } from '../ui/button/index.ts'
import { Input } from '../ui/input/index.ts'
import { Label } from '../ui/label/index.ts'

import { validationRules } from '../../utils/validationRule.ts'
import type { Emitter } from 'mitt';
import type Position from '../../scripts/model/position/PositionModel.ts'
import { retrivePositionHandler, } from '../../scripts/handler/position/PositionHandler.ts'
import { createMember } from '../../scripts/model/member/MemberModel.ts'
import { createMemberHandler, updateMemberHandler } from '../../scripts/handler/member/MemberHandler.ts'
import { uploadFileHandler } from '../../scripts/handler/FileUploadHanlder.ts'
import { toast } from '../ui/toast/use-toast.ts'
import { useI18n } from 'vue-i18n'
import type MemberModel from '../../scripts/model/member/MemberModel.ts'

// Components
const Experience = defineAsyncComponent(() => import('../form/member/Experience.vue'))
const CareerStatus = defineAsyncComponent(() => import('../form/member/CareerStatus.vue'))
const PositionSelection = defineAsyncComponent(() => import('../selection/Position.vue'))
const MemberSelection = defineAsyncComponent(() => import('../selection/Member.vue'))


// Define Props
const props = defineProps({
  memberList: {
    type: Array as () => MemberModel[],
    required: true
  },
  member: {
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
const previewImage = ref<string>('')
const emitter = inject<Emitter<{ [event: string]: unknown }>>('emitter');
const member = ref(JSON.parse(JSON.stringify(props.member)) as MemberModel)
const showForm = ref<boolean>(props.showForm)
const status = ref<string>("New")
const positionList = ref<Position[]>([] as Position[])
const _file = ref<File | null>(null);
const _fileChange = ref<boolean>(false)
const _position = ref<any>('')

//Temp
// Define props and emits
const emit = defineEmits(['update:open', 'updateForm', "closeForm"])


// Computed Properties
const position_id = computed(() => {
  return (typeof member.value.position == 'object') ? member.value.position._id : member.value.position
})


const current_member_id = computed(() => {
  return member.value?.id
})

const member_parent_id = computed(() => {
  return (typeof member.value?.parent == 'object') ? member.value.parent._id : member.value.parent
})

// Define methods
const handlePositionChange = (position: string) => {
  if (position) {
    member.value.position = position
  }
}

const handleMemberChange = (memberChange: string) => {
  if (memberChange) {
    member.value.parent = memberChange
  }
}

const onLoadPosition = async () => {
  try {
    emitter?.emit("stateLoading", true);
    const { data, statusCode } = await retrivePositionHandler();
    if (statusCode === 200) {
      positionList.value = (data);
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

const validationMemberForm = async () => {
  if (!member.value.en.name.trim()) {
    toast({
      title: "Warning",
      description: "English Name is required",
      variant: "destructive",
    });
    return false
  }

  if (!member.value.en.experience || !member.value.en.experience.length) {
    toast({
      title: "Warning",
      description: "English Experience is required",
      variant: "destructive",
    });
    return false
  }

  if (!member.value.en.careerStatus || !member.value.en.careerStatus.length) {
    toast({
      title: "Warning",
      description: "English Career Status is required",
      variant: "destructive",
    });
    return false
  }

  if (!member.value.kh.experience || !member.value.kh.experience.length) {
    toast({
      title: "Warning",
      description: "Khmer Experience is required",
      variant: "destructive",
    });
    return false
  }

  if (!member.value.kh.name.trim()) {
    toast({
      title: "Warning",
      description: "Khmer Name is required",
      variant: "destructive",
    });
    return false
  }

  if (!member.value.kh.careerStatus || !member.value.kh.careerStatus.length) {
    toast({
      title: "Warning",
      description: "Khmer Career Status is required",
      variant: "destructive",
    });
    return false
  }



  return true
}


const onHandleSummitForm = async (e: Event) => {
  try {
    e.preventDefault();
    member.value.position = (typeof member?.value?.position === 'object' ? member?.value.position?._id : member?.value?.position) || "";
    if (!await validationMemberForm()) {
      return
    }
    if (_fileChange.value && _file.value) {
      try {
        const { data, statusCode } = await uploadFileHandler(_file.value);

        if (statusCode === 200 && data?.url) {
          member.value.en.imageUrl = data.url;
          member.value.kh.imageUrl = data.url;
        } else {
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
    const { data,message, statusCode } = await updateMemberHandler(member.value as MemberModel);
    
    if (statusCode == 200 && data) {
      emit('updateForm', {
        ...data,
        position: _position.value,
        status: status.value
      })
      toast({
        description: t('update_member_success'),
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
    const { data, message,statusCode } = await createMemberHandler(member.value as MemberModel);
    if (statusCode == 200) {
      emit('updateForm', {
        ...data,
        position: _position.value,
        status: status.value
      })
      toast({
        description: t('create_member_success'),
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
  await onLoadPosition()
})

// Define Watch
watch(
  () => member?.value.en?.birthDate,
  () => {
    if (member.value.en.birthDate) {
      member.value.kh.birthDate = member.value.en.birthDate
    }
  }
)
watch(
  () => member?.value.kh?.birthDate,
  (newVal) => {
    if (newVal) {
      member.value.en.birthDate = newVal
    }
  }, { immediate: true, deep: true }
)

watch(
  () => [props.member, props.showForm],
  () => {
    if (Object.keys(props.member).length == 0) {
      member.value = createMember();
      status.value = "New";
      previewImage.value = "";
      _position.value = ''
    } else {
      status.value = "Update";
      member.value = createMember(JSON.parse(JSON.stringify(props.member)) as MemberModel)
      previewImage.value = (member.value.en.imageUrl || member.value.kh.imageUrl);
      if (previewImage.value && !previewImage.value.includes("https://")) {
        previewImage.value = "https://" + previewImage.value;
      }
      _position.value = member.value.position
      console.log(member.value, 'member .position')
    }
    showForm.value = props.showForm
  }, { immediate: true, deep: true })
</script>
