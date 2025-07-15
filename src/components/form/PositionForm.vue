<template>
  <div>
    <Dialog :open="showForm" @update:open="emit('update:open', $event)">
      <DialogContent class="sm:max-w-[625px] bg-white ">
        <DialogHeader>
          <DialogTitle>{{ $t('position') }}</DialogTitle>
          <DialogDescription>
            {{ $t('position_form_desc') }}
          </DialogDescription>
        </DialogHeader>

        <form @submit.prevent="onHandleSummitForm" class="space-y-4">
          <div class="grid grid-cols-2 gap-4 py-4">
            <div>
              <!-- Name Field -->
              <div class="flex flex-col items-start justify-center mb-4">
                <Label for="name" class="text-left mb-1">{{ $t('title') }}</Label>
                <Input v-model="position.en.title" required class="col-span-3" />
              </div>
              <!-- Name Field -->
              <div class="flex flex-col items-start justify-center mb-4">
                <Label for="name" class="text-left mb-1">{{ $t('title_kh') }}</Label>
                <Input v-model="position.kh.title" required class="col-span-3" />
              </div>
            </div>

            <div>
              <div class="flex flex-col items-start justify-center mb-4">
                <Label for="name" class="text-left mb-1">{{ $t('level') }}</Label>
                <Select v-model="position.en.level" required class="w-full ">
                  <SelectTrigger>
                    <SelectValue :value="position.en.level" required :placeholder="$t('select_position')" />
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
import { useToast } from '../ui/toast/use-toast.ts'
import { useI18n } from 'vue-i18n'
import type PositionModel from '../../scripts/model/position/PositionModel.ts'
import { createPosition } from '../../scripts/model/position/PositionModel.ts'
import { createPositionHandler, updatePositionHandler } from '../../scripts/handler/position/PositionHandler.ts'
import type { Emitter } from 'mitt';

const props = defineProps({
  position: {
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
const position = ref<PositionModel>(JSON.parse(JSON.stringify(props.position))); // Deep copy
const showForm = ref<boolean>(props.showForm);
const status = ref<string>("New");

// Define props and emits
const emit = defineEmits(['update:open','updateForm', "closeForm"])

// Define methods

const onHandleSummitForm = async () => {
  if (status.value == "New") onHandleCreatePosition()
  else onHandleUpdatePosition()
}

const onHandleUpdatePosition = async () => {
  try {
    emitter?.emit("stateLoading", true);
    const { data, message, statusCode } = await updatePositionHandler(position.value as PositionModel);
    
    if (statusCode == 200 && data) {
      emit('updateForm', {
        ...data,
        status: status.value
      })
      toast({
        description: t('update_position_success'),
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

const onHandleCreatePosition = async () => {
  try {
    emitter?.emit("stateLoading", true);
    position.value.kh.level = position.value.en.level
    const { data, message, statusCode } = await createPositionHandler(position.value as PositionModel);
    
    if (statusCode == 200 && data) {
      emit('updateForm', {
        ...data,
        status: status.value
      })
      toast({
        description: t('create_position_success'),
        variant: 'success',
        title: t("success"),
      });
      emit('closeForm')
    }else {
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
  () => [props.position, props.showForm],
  () => {
    if (props.position && props.position._id && props.position._id) {
      position.value = createPosition(JSON.parse(JSON.stringify(props.position)) as PositionModel); // Deep copy
      status.value = "Update";
    } else {
      position.value = createPosition();
      status.value = "New";
    }
    showForm.value = props.showForm
  }, { immediate: true, },)
</script>