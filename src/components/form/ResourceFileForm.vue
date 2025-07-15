<template>
  <div class="flex flex-col items-start justify-center w-full">
    <div class="w-full relative">
      <form
        @submit.prevent="onHandleSummitForm"
        class="flex justify-between items-center gap-2"
      >
        <div class="flex justify-between items-center">
          <Input
            type="file"
            :key="FILEKEY"
            ref="fileInput"
            :required="!selectedFile"
            @onChange="handleFileResourceInput"
            @input="handleFileResourceInput"
            class="col-span-3"
            accept="application/pdf"
          />
        </div>
        <div class="flex items-start justify-center gap-2">
          <Button variant="outline" type="submit" :disabled="isUploading">
            <Icon icon="radix-icons:plus" />
          </Button>
          <Button variant="outline" type="button" @click="showFileList = true">
            <Icon icon="radix-icons:file-text" />
          </Button>
        </div>
      </form>
    </div>

    <Dialog
      v-model:open="showFileList"
      class="border rounded-md w-3/5 h-[50vh] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
    >
      <DialogContent class="sm:max-w-[620px] bg-white">
        <DialogHeader class="flex flex-col">
          <DialogTitle>{{ $t("file_list") }}</DialogTitle>
        </DialogHeader>
        <div class="overflow-x-auto scrollbar-hide w-full h-[40vh]">
          <Table class="w-full bg-white relative">
            <TableHeader>
              <TableRow>
                <TableHead class="w-[10%]">{{ $t("no") }}</TableHead>
                <TableHead class="w-[50%]">{{ $t("file_name") }}</TableHead>
                <TableHead class="w-[25%]">{{ $t("size") }}</TableHead>
                <TableHead class="text-right w-[15%]">{{
                  $t("action")
                }}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="(file, index) in fileList" :key="index">
                <TableCell class="font-medium">{{ index + 1 }}</TableCell>
                <TableCell>{{ file.file_name }}</TableCell>
                <TableCell>{{ formatFileSize(file.size || 0) }}</TableCell>
                <TableCell
                  class="text-right flex justify-end items-center gap-2"
                >
                  <button
                    class="bg-red-600 rounded-md px-5 py-2"
                    @click="removeFile(index)"
                  >
                    {{ $t("remove") }}
                  </button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useToast } from "../ui/toast/use-toast";
import { useI18n } from "vue-i18n";
import { Input } from "../ui/input/index.ts";
import { Button } from "../ui/button/index.ts";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog/index.ts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table/index.ts";
import { Icon } from "@iconify/vue";
import { uploadFileHandler } from "../../scripts/handler/FileUploadHanlder.ts";

interface FileItem {
  file_name: string;
  size: number | undefined;
  url: string;
}

const { t } = useI18n();
const { toast } = useToast();
const emit = defineEmits(["updateFiles", "uploadComplete"]);

const props = defineProps({
  initialFiles: {
    type: Array as () => FileItem[],
    default: () => [],
  },
  showForm: {
    type: Boolean,
    default: false,
  },
});

const selectedFile = ref<File | null>(null);
const FILEKEY = ref<number>(new Date().getTime());
const fileList = ref<FileItem[]>([]);
const showFileList = ref(false);
const isUploading = ref(false);

const handleFileResourceInput = (event: { target: { files: File[] } }) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    selectedFile.value = file as File;
  };
  reader.readAsDataURL(file);
};

const uploadFile = async (file: File): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    if (selectedFile.value) {
      const { data, statusCode } = await uploadFileHandler(selectedFile.value);
      if (statusCode === 200 && data?.url) {
        return data.url;
      }
    } else {
      toast({
        description: t("file_upload_error"),
        variant: "destructive",
        title: t("error"),
      });
    }
    throw new Error("Upload Failed: No URL Returned");
  } catch (error) {
    console.error("Upload error:", error);
    throw error;
  }
};

const onHandleSummitForm = async () => {
  if (!selectedFile.value) return;

  try {
    isUploading.value = true;
    const fileUrl = await uploadFile(selectedFile.value);

    fileList.value.push({
      file_name: selectedFile.value.name,
      size: selectedFile.value.size,
      url: fileUrl,
    });

    toast({
      description: t("file_upload_success"),
      variant: "success",
      title: t("success"),
    });

    selectedFile.value = null;
    FILEKEY.value = new Date().getTime();

    emit("uploadComplete", fileList.value);
    selectedFile.value = null;
  } catch (error) {
    toast({
      description: t("file_upload_error"),
      variant: "destructive",
      title: t("error"),
    });
  } finally {
    isUploading.value = false;
  }
};

const removeFile = (index: number) => {
  fileList.value.splice(index, 1);
  emit("updateFiles", fileList.value);
};

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

watch(
  () => props.initialFiles,
  (newVal) => {
    if  (newVal) {
      fileList.value = newVal as FileItem[];
    }
  },
  { immediate: true, deep: true }
);
</script>
