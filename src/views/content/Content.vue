<template>
  <div class="p-4 h-full">
    <div class="fixed top-5 right-4">
      <button type="button" @click="$router.back()" class="flex p-1 bg-green-500 text-white rounded-lg">
        <Icon icon="radix-icons:arrow-left" class="h-6 w-6" />
      </button>
    </div>
    <form>
      <Tabs default-value="Khmer">
        <TabsList class="grid w-full grid-cols-3">
          <TabsTrigger value="Khmer">
            {{ $t("khmer_content") }}
          </TabsTrigger>
          <TabsTrigger value="english">
            {{ $t("english_content") }}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="Khmer">
          <Card class="p-2">
            <div class="tiptap-example">
              <div class="flex h-[76.5vh] justify-between items-start">
                <div class="editor-container h-full w-2/3 overflow-y-scroll scroll-smooth">
                  <TiptapEditor v-model="editorContentKH" :editable="isEditable" @editor-update="handleEditorUpdate" />
                </div>

                <!-- Margin Top Base from Editor -->
                <div class="w-1/3 mt-[80px] overflow-y-scroll p-2">
                  <div class="flex flex-col items-start justify-center mb-2">
                    <Label class="text-left mb-1">{{ $t("title_kh") }}</Label>
                    <Input required v-model="blog.kh.title" :rules="[validationRules.required]" class="col-span-3" />
                  </div>
                  <div class="flex flex-col items-start justify-center mb-2">
                    <Label class="text-left mb-1">{{
                      $t("description_kh")
                      }}</Label>
                    <Textarea required v-model="blog.kh.description" :rules="[validationRules.required]"
                      class="col-span-3" />
                  </div>

                  <div class="grid grid-cols-2 gap-4">
                    <div class="flex flex-col items-start justify-center mb-2">
                    <Label class="text-left mb-1">{{ $t("category") }}</Label>
                    <SelectContentCategory :initContentCategory="blog.category"
                      @contentCategoryChange="handleChangeContentCategory" />
                  </div>

                  <div class="flex flex-col items-start justify-center mb-2">
                    <Label class="text-left mb-1">{{ $t("source") }}</Label>
                    <SelectMinistry :ministryList="ministryList" :initMinistry="blog.source"
                      @ministryChange="handleMinistryChange" />
                  </div>
                  </div>

                  <div class="grid grid-cols-2 gap-4">
                    <div class="flex flex-col items-start justify-center mb-2">
                      <Label class="text-left mb-1">{{ $t("tag") }}</Label>
                      <SelectTags :tagList="tagList" :initTag="blog.tags" @tagsChange="handleChangeTags" />
                    </div>
                    <div class="flex flex-col items-start justify-center mb-2">
                      <Label class="text-left mb-1">{{ $t("status") }}</Label>
                      <SelectStatus :initResourceLang="blog.status" @resourceLangChange="handleChangeStatus" />
                    </div>
                  </div>

                  <div class="flex flex-col items-start justify-center mb-2">
                    <Label class="text-left mb-1">{{ $t("cover") }}</Label>
                    <div class="max-h-[11rem] h-[11rem] w-full border rounded-md">
                      <img v-if="previewImage" :src="previewImage" alt="Partner Logo"
                        class="w-full h-full object-cover bg-cover rounded-md"
                        style="object-position: top;" />
                    </div>
                  </div>
                  <div class="flex flex-col items-start justify-center mb-2">
                    <Label class="text-left mb-1">{{ $t("file") }}</Label>
                    <Input type="file" @onChange="handleFileInput" :required="previewImage != ''" @input="handleFileInput" class="col-span-3"
                      accept="image/*" />
                  </div>
                </div>
              </div>

              <!-- <div v-if="showOutput" class="output">
                <h3>Editor Output</h3>
                <div class="output-tabs">
                  <button :class="{ active: activeTab === 'html' }" @click="activeTab = 'html'">
                    HTML
                  </button>
                  <button :class="{ active: activeTab === 'json' }" @click="activeTab = 'json'">
                    JSON
                  </button>
                  <button :class="{ active: activeTab === 'text' }" @click="activeTab = 'text'">
                    Text
                  </button>
                </div>

                <div class="output-content">
                  <pre v-if="activeTab === 'html'">{{ editorOutput.html }}</pre>
                  <pre v-else-if="activeTab === 'json'">{{ JSON.stringify(editorOutput.json, null, 2) }}</pre>
                  <pre v-else-if="activeTab === 'text'">{{ editorOutput.text }}</pre>
                </div>
              </div> -->
            </div>
          </Card>
        </TabsContent>
        <TabsContent value="english">
          <Card class="p-2">
            <div class="tiptap-example">
              <div class="flex h-[76.5vh] justify-between items-start">
                <div class="editor-container h-full w-2/3 overflow-y-scroll scroll-smooth">
                  <TiptapEditor v-model="editorContentEN" :editable="isEditable" @editor-update="handleEditorUpdate" />
                </div>

                <!-- Margin Top Base from Editor -->
                <div class="w-1/3 mt-[80px] overflow-y-scroll p-2">
                  <div class="flex flex-col items-start justify-center mb-2">
                    <Label class="text-left mb-1">{{ $t("title") }}</Label>
                    <Input required v-model="blog.en.title" :rules="[validationRules.required]" class="col-span-3" />
                  </div>
                  <div class="flex flex-col items-start justify-center mb-2">
                    <Label class="text-left mb-1">{{
                      $t("description")
                      }}</Label>
                    <Textarea required v-model="blog.en.description" :rules="[validationRules.required]"
                      class="col-span-3" />
                  </div>

                  <div class="grid grid-cols-2 gap-4">
                    <div class="flex flex-col items-start justify-center mb-2">
                    <Label class="text-left mb-1">{{ $t("category") }}</Label>
                    <SelectContentCategory :initContentCategory="blog.category"
                      @contentCategoryChange="handleChangeContentCategory" />
                  </div>
                  <div class="flex flex-col items-start justify-center mb-2">
                    <Label class="text-left mb-1">{{ $t("source") }}</Label>
                    <SelectMinistry :ministryList="ministryList" :initMinistry="blog.source"
                      @ministryChange="handleMinistryChange" />
                  </div>
                  </div>

                  <div class="grid grid-cols-2 gap-4">
                    <div class="flex flex-col items-start justify-center mb-2">
                      <Label class="text-left mb-1">{{ $t("tag") }}</Label>
                      <SelectTags :tagList="tagList" :initTag="blog.tags" @tagsChange="handleChangeTags" />
                    </div>
                    <div class="flex flex-col items-start justify-center mb-2">
                      <Label class="text-left mb-1">{{ $t("status") }}</Label>
                      <SelectStatus :initResourceLang="blog.status" @resourceLangChange="handleChangeStatus" />
                    </div>
                  </div>

                  <div class="flex flex-col items-start justify-center mb-2">
                    <Label class="text-left mb-1">{{ $t("cover") }}</Label>
                    <div class="max-h-[11rem] h-[11rem] w-full border rounded-md">
                      <img v-if="previewImage" :src="previewImage" alt="Partner Logo"
                        class="w-full h-full object-cover bg-cover rounded-md" style="object-position: top;"/>
                    </div>
                  </div>
                  <div class="flex flex-col items-start justify-center mb-2">
                    <Label class="text-left mb-1">{{ $t("file") }}</Label>
                    <Input type="file" :required="!previewImage" @onChange="handleFileInput" @input="handleFileInput"
                      class="col-span-3" accept="image/*" />
                  </div>
                </div>
              </div>

              <div v-if="showOutput" class="output">
                <h3>Editor Output</h3>
                <div class="output-tabs">
                  <button :class="{ active: activeTab === 'html' }" @click="activeTab = 'html'">
                    HTML
                  </button>
                  <button :class="{ active: activeTab === 'json' }" @click="activeTab = 'json'">
                    JSON
                  </button>
                  <button :class="{ active: activeTab === 'text' }" @click="activeTab = 'text'">
                    Text
                  </button>
                </div>

                <div class="output-content">
                  <pre v-if="activeTab === 'html'">{{ editorOutput.html }}</pre>
                  <pre v-else-if="activeTab === 'json'">{{
                    JSON.stringify(editorOutput.json, null, 2)
                  }}</pre>
                  <pre v-else-if="activeTab === 'text'">{{
                    editorOutput.text
                  }}</pre>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
      <div class="controls flex justify-end px-2">
        <!-- <button @click="isEditable = !isEditable">
                  {{ isEditable ? 'Set Read-Only' : 'Enable Editing' }}
                </button>
                <button @click="resetContent">Reset Content</button>
                <button @click="showOutput = !showOutput">
                  {{ showOutput ? 'Hide' : 'Show' }} Output
                </button> -->
        <button type="button" @click="$router.back()" class="flex p-1 bg-red-500 text-white rounded-lg">
          <Icon icon="radix-icons:check" class="h-6 w-6" />
          {{ $t("cancel") }}
        </button>
        <button type="button" @click="onSaveContent" class="flex p-1 bg-green-500 text-white rounded-lg">
          <Icon icon="radix-icons:check" class="h-6 w-6" />
          {{ $t("save") }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineAsyncComponent, onMounted, inject } from "vue";
import { Icon } from "@iconify/vue";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TiptapEditor from "@/components/tiptap/TextEditor.vue";
import { createBlog } from "@/scripts/model/blog/BlogModel";
import type BlogModel from "@/scripts/model/blog/BlogModel";
import type TagModel from "@/scripts/model/tag/TagModel";
import type MinistryModel from "@/scripts/model/ministry/MinistryModel";
import { validationRules } from "@/utils/validationRule.ts";
import type { Emitter } from "mitt";
import { useToast } from "@/components/ui/toast/use-toast";
import { useRoute, useRouter } from "vue-router";
import { retriveTagHandler } from "@/scripts/handler/tag/TagHandler";
import {
  retriveOneBlogHandler,
  updateBlogHandler,
  createBlogHandler,
} from "@/scripts/handler/blog/BlogHandler";
import { retriveMinistryHandler } from "@/scripts/handler/ministry/MinistryHandler";
import { uploadFileHandler } from "@/scripts/handler/FileUploadHanlder.ts";

const SelectContentCategory = defineAsyncComponent(
  () => import("@/components/selection/ContentCategory.vue")
);
const SelectTags = defineAsyncComponent(
  () => import("@/components/selection/Tags.vue")
);
const SelectStatus = defineAsyncComponent(
  () => import("@/components/selection/ReleaseStatus.vue")
)
const SelectMinistry = defineAsyncComponent(
  () => import("@/components/selection/Ministry.vue")
);

// Editor content
const { toast } = useToast();
const router = useRouter();
const emitter = inject<Emitter<{ [event: string]: unknown }>>("emitter");
const blog = ref<BlogModel>({} as BlogModel);
const editorContentKH = ref({
  type: "doc",
  content: [],
});
const editorContentEN = ref({
  type: "doc",
  content: [],
});

// Navigation
const route = useRoute();

// Control variables
const previewImage = ref<string>("");
const _file = ref<File | null>(null);
const _fileChange = ref<boolean>(false);
const tagList = ref<TagModel[]>([] as TagModel[]);
const ministryList = ref<MinistryModel[]>([] as MinistryModel[]);
const isEditable = ref<boolean>(true);
const showOutput = ref<boolean>(false);
const activeTab = ref<string>("html");
const status = ref<string>("");
const source = ref<string>("");

// Editor output
const editorOutput = ref({
  html: "",
  text: "",
  json: {},
});

// Methods
const handleEditorUpdate = (output: any) => {
  editorOutput.value = output;
};

const handleFileInput = (event: { target: { files: any[] } }) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    previewImage.value = reader.result as string;
    _file.value = file as File;
    _fileChange.value = true;
  };
  reader.readAsDataURL(file);
};

const handleMinistryChange = (ministry: string) => {
  if (ministry) {
    blog.value.source = ministry;
  }
};

const handleChangeStatus = (value: string) => {
  if (value) {  
    blog.value.status = value;
  }
}

const handleChangeContentCategory = (value: string) => {
  if (value) {
    blog.value.category = value;
  }
};

const handleChangeTags = (value: string[]) => {
  if (value) {
    blog.value.tags = value;
  }
};

const onLoadContent = async (id: string) => {
  try {
    emitter?.emit("stateLoading", true);
    const { statusCode, data } = await retriveOneBlogHandler(id);
    if (statusCode === 200) {
      blog.value = createBlog(data as BlogModel);
      previewImage.value = blog.value.cover;
      editorContentEN.value = data.en?.document.content;
      editorContentKH.value = data.kh?.document?.content;
    }
  } catch (error) {
    console.log(error);
  } finally {
    emitter?.emit("stateLoading", false);
  }
};

const onLoadTags = async () => {
  try {
    emitter?.emit("stateLoading", true);
    const { statusCode, data } = await retriveTagHandler();
    if (statusCode === 200) {
      tagList.value = data as TagModel[];
    }
  } catch (error) {
    console.log(error);
  } finally {
    emitter?.emit("stateLoading", false);
  }
};

const onLoadMinistry = async () => {
  try {
    emitter?.emit("stateLoading", true);
    const { statusCode, data } = await retriveMinistryHandler();
    if (statusCode === 200) {
      ministryList.value = data as MinistryModel[];
    }
  } catch (error) {
    console.log(error);
  } finally {
    emitter?.emit("stateLoading", false);
  }
};

const onHandleCreateBlog = async () => {
  try {
    emitter?.emit("stateLoading", true);
    const { statusCode, message } = await createBlogHandler(blog.value);
    if (statusCode === 200) {
      toast({
        title: "Success",
        description: "Create Blog Success",
        variant: "success",
      });
      setTimeout(() => {
        router.push({ name: source.value });
      }, 300);
    } else {
      toast({
        title: "Something went wrong",
        description: message,
        variant: "warning",
      });
    }
  } catch (error) {
    console.log(error);
  } finally {
    emitter?.emit("stateLoading", false);
  }
};

const onHandleUpdateBlog = async () => {
  try {
    emitter?.emit("stateLoading", true);
    const { statusCode, message } = await updateBlogHandler(blog.value);
    if (statusCode === 200) {
      toast({
        title: "Success",
        description: "Create Blog Success",
        variant: "success",
      });
      setTimeout(() => {
        router.push({ name: source.value });
      }, 300);
    } else {
      toast({
        title: "Something went wrong",
        description: message,
        variant: "warning",
      });
    }
  } catch (error) {
    console.log(error);
  } finally {
    emitter?.emit("stateLoading", false);
  }
};

const onValidationOfContent = async () => {
  if(blog.value.source == ""){
    toast({
      title: "Please select ministry",
      variant: "warning",
    });
    return false;
  }

  if(blog.value.status == ""){
    toast({
      title: "Please select status",
      variant: "warning",
    });
    return false;
  }

  if(blog.value.category == ""){
    toast({
      title: "Please select category",
      variant: "warning",
    });
    return false;
  }

  if(blog.value.tags.length == 0){
    toast({
      title: "Please select tags",
      variant: "warning",
    });
    return false;
  }

  if(blog.value.en.title == "" || blog.value.kh.title == ""){
    toast({
      title: "Please Input Title",
      variant: "warning",
    });
    return false;
  }

  return true
}

const onSaveContent = async () => {
  try {
    if(!await onValidationOfContent()){
      return
    }

    emitter?.emit("stateLoading", true);
    if (_fileChange.value && _file.value) {
      try {
        const { data, statusCode } = await uploadFileHandler(_file.value);

        if (statusCode === 200 && data?.url) {
          blog.value.cover = data.url;
        } else {
          throw new Error("File upload failed");
        }
      } catch (error) {
        console.error(error);
        return;
      }
    }
    blog.value.kh.document = {
      ...blog.value.kh.document,
      content: editorContentKH.value,
    };
    blog.value.en.document = {
      ...blog.value.en.document,
      content: editorContentEN.value,
    };
    const action =
      status.value === "New" ? onHandleCreateBlog : onHandleUpdateBlog;
    await action();
  } catch (error) {
    console.log(error);
  } finally {
    emitter?.emit("stateLoading", false);
  }
};

const resetContent = () => {
  editorContentKH.value = {
    type: "doc",
    content: [],
  };
  editorContentEN.value = {
    type: "doc",
    content: [],
  };
};

onMounted(async () => {
  await onLoadTags();
  await onLoadMinistry();
});

watch(
  () => route.query,
  async (value) => {
    status.value = value.status === "new" ? "New" : "Update";
    blog.value = createBlog({} as BlogModel);
    source.value = value.source as string;
    if(typeof value.source === 'string' && value.source.toLowerCase() === 'banner'){
      blog.value.category = value.source.toLowerCase();
    }

    if (status.value === "New") {
      resetContent();
    } else if (status.value === "Update" && value.id) {
      await onLoadContent(value.id as string);
    }
  },
  {
    immediate: true,
  }
);
</script>

<style scoped>
.tiptap-example {
  margin: 0 auto;
  padding: 20px;
}

h2 {
  margin-bottom: 20px;
}

.editor-container {
  margin-bottom: 20px;
}

.controls {
  margin-top: 10px;
  display: flex;
  gap: 10px;
}

.controls button {
  padding: 10px 20px;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.controls button:hover {
  background-color: #3e8e41;
}

.output {
  margin-top: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
}

.output h3 {
  padding: 10px;
  margin: 0;
  background-color: #f5f5f5;
  border-bottom: 1px solid #ddd;
}

.output-tabs {
  display: flex;
  background-color: #f5f5f5;
  border-bottom: 1px solid #ddd;
}

.output-tabs button {
  padding: 8px 16px;
  background: none;
  border: none;
  cursor: pointer;
  border-right: 1px solid #ddd;
}

.output-tabs button.active {
  background-color: white;
  font-weight: bold;
}

.output-content {
  padding: 16px;
  background-color: white;
  overflow: auto;
  max-height: 300px;
}

pre {
  margin: 0;
  white-space: pre-wrap;
  font-family: "Courier New", Courier, monospace;
  font-size: 14px;
}
</style>
