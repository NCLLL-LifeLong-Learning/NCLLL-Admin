<template>
  <div class="p-4 h-full">
    <div class="fixed top-5 right-4">
      <button
        type="button"
        @click="$router.back()"
        class="flex p-1 bg-green-500 text-white rounded-lg"
      >
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
                <div
                  class="editor-container h-full w-2/3 overflow-y-scroll scroll-smooth"
                >
                  <TiptapEditor
                    v-model="editorContentKH"
                    :editable="isEditable"
                    @editor-update="handleEditorUpdate"
                  />
                </div>

                <!-- Margin Top Base from Editor -->
                <div class="w-1/3 mt-[80px] overflow-y-scroll p-2">
                  <div
                    class="flex flex-col items-start justify-center mb-2"
                    v-if="subCategory != 'Engagement'"
                  >
                    <Label class="text-left mb-1">{{ $t("title") }}</Label>
                    <Input
                      required
                      v-model="module.kh.title"
                      :rules="[validationRules.required]"
                      class="col-span-3"
                    />
                  </div>
                  <div
                    class="flex flex-col items-start justify-center mb-2"
                    v-else
                  >
                    <Label class="text-left mb-1">{{ $t("title") }}</Label>
                    <SelectionEngagementCategoryTab
                      :initSubCategory="module.kh.title"
                      :subCategoryList="(EngagementCategoryKH as any)"
                      @subCategoryChange="onEngagementSubCategoryChange"
                    />
                  </div>

                  <div class="flex flex-col items-start justify-center mb-2">
                    <Label class="text-left mb-1">{{
                      $t("description_kh")
                    }}</Label>
                    <Textarea
                      required
                      v-model="module.kh.description"
                      :rules="[validationRules.required]"
                      class="col-span-3"
                    />
                  </div>
                  <div class="flex flex-col items-start justify-center mb-2">
                    <Label class="text-left mb-1">{{
                      $t("main_category")
                    }}</Label>
                    <SelectMainCategory
                      :initMainCategory="module.mainCategory"
                      @mainCategoryChange="onMainCategoryChange"
                    />
                  </div>

                  <div
                    class="flex flex-col items-start justify-center mb-2"
                    v-if="module.mainCategory == 'Program'"
                  >
                    <Label for="name" class="text-left mb-1">{{
                      $t("sub_category")
                    }}</Label>
                    <SelectionSubCategoryTab
                      :initSubCategory="subCategory"
                      @subCategoryChange="onSubCategoryChange"
                    />
                  </div>

                  <div class="flex flex-col items-start justify-center mb-2">
                    <Label class="text-left mb-1">{{ $t("cover") }}</Label>
                    <div
                      class="h-[11rem] max-h-[11rem] w-full border rounded-md"
                    >
                      <img
                        v-if="previewImage"
                        :src="previewImage"
                        alt="Partner Logo"
                        class="w-full h-full object-cover bg-cover rounded-md"
                        style="object-position: top"
                      />
                    </div>
                  </div>
                  <div class="flex flex-col items-start justify-center mb-2">
                    <Label class="text-left mb-1">{{ $t("file") }}</Label>
                    <Input
                      type="file"
                      @onChange="handleFileInput"
                      @input="handleFileInput"
                      :required="previewImage != ''"
                      class="col-span-3"
                      accept="image/*"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
        <TabsContent value="english">
          <Card class="p-2">
            <div class="tiptap-example">
              <div class="flex h-[76.5vh] justify-between items-start">
                <div
                  class="editor-container h-full w-2/3 overflow-y-scroll scroll-smooth"
                >
                  <TiptapEditor
                    v-model="editorContentEN"
                    :editable="isEditable"
                    @editor-update="handleEditorUpdate"
                  />
                </div>

                <!-- Margin Top Base from Editor -->
                <div class="w-1/3 mt-[80px] overflow-y-scroll p-2">
                  <div
                    class="flex flex-col items-start justify-center mb-2"
                    v-if="subCategory != 'Engagement'"
                  >
                    <Label class="text-left mb-1">{{ $t("title") }}</Label>
                    <Input
                      required
                      v-model="module.en.title"
                      :rules="[validationRules.required]"
                      class="col-span-3"
                    />
                  </div>
                  <div
                    class="flex flex-col items-start justify-center mb-2"
                    v-else
                  >
                    <Label class="text-left mb-1">{{ $t("title") }}</Label>
                    <SelectionEngagementCategoryTab
                      :initSubCategory="module.en.title"
                      :subCategoryList="(EngagementCategory as any)"
                      @subCategoryChange="onEngagementSubCategoryChange"
                    />
                  </div>

                  <div class="flex flex-col items-start justify-center mb-2">
                    <Label class="text-left mb-1">{{
                      $t("description")
                    }}</Label>
                    <Textarea
                      required
                      v-model="module.en.description"
                      :rules="[validationRules.required]"
                      class="col-span-3"
                    />
                  </div>
                  <div class="flex flex-col items-start justify-center mb-2">
                    <Label class="text-left mb-1">{{
                      $t("main_category")
                    }}</Label>
                    <SelectMainCategory
                      :initMainCategory="module.mainCategory"
                      @mainCategoryChange="onMainCategoryChange"
                    />
                  </div>

                  <div
                    class="flex flex-col items-start justify-center mb-2"
                    v-if="module.mainCategory == 'Program'"
                  >
                    <Label for="name" class="text-left mb-1">{{
                      $t("sub_category")
                    }}</Label>
                    <SelectionSubCategoryTab
                      :initSubCategory="subCategory"
                      @subCategoryChange="onSubCategoryChange"
                    />
                  </div>

                  <div class="flex flex-col items-start justify-center mb-2">
                    <Label class="text-left mb-1">{{ $t("cover") }}</Label>
                    <div
                      class="h-[11rem] max-h-[11rem] w-full border rounded-md"
                    >
                      <img
                        v-if="previewImage"
                        :src="previewImage"
                        alt="Partner Logo"
                        class="w-full h-full object-cover bg-cover rounded-md"
                        style="object-position: top"
                      />
                    </div>
                  </div>
                  <div class="flex flex-col items-start justify-center mb-2">
                    <Label class="text-left mb-1">{{ $t("file") }}</Label>
                    <Input
                      type="file"
                      @onChange="handleFileInput"
                      @input="handleFileInput"
                      :required="previewImage != ''"
                      class="col-span-3"
                      accept="image/*"
                    />
                  </div>
                </div>
              </div>

              <div v-if="showOutput" class="output">
                <h3>Editor Output</h3>
                <div class="output-tabs">
                  <button
                    :class="{ active: activeTab === 'html' }"
                    @click="activeTab = 'html'"
                  >
                    HTML
                  </button>
                  <button
                    :class="{ active: activeTab === 'json' }"
                    @click="activeTab = 'json'"
                  >
                    JSON
                  </button>
                  <button
                    :class="{ active: activeTab === 'text' }"
                    @click="activeTab = 'text'"
                  >
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
        <button
          @click="$router.back()"
          type="button"
          class="flex p-1 bg-red-500 text-white rounded-lg"
        >
          <Icon icon="radix-icons:check" class="h-6 w-6" />
          {{ $t("cancel") }}
        </button>
        <button
          type="button"
          @click="onSaveContent"
          class="flex p-1 bg-green-500 text-white rounded-lg"
        >
          <Icon icon="radix-icons:check" class="h-6 w-6" />
          {{ $t("save") }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineAsyncComponent, inject, computed } from "vue";
import { Icon } from "@iconify/vue";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TiptapEditor from "@/components/tiptap/TextEditor.vue";
import { createModule } from "@/scripts/model/module/ModuleModel";
import type ModuleModel from "@/scripts/model/module/ModuleModel";
import { validationRules } from "@/utils/validationRule.ts";
import type { Emitter } from "mitt";
import { useToast } from "@/components/ui/toast/use-toast";
import { useRoute, useRouter } from "vue-router";
import {
  retriveOneModuleHandler,
  updateModuleHandler,
  createModuleHandler,
} from "@/scripts/handler/module/ModuleHandler";
import { uploadFileHandler } from "@/scripts/handler/FileUploadHanlder.ts";
import {
  EngagementCategory,
  EngagementCategoryKH,
} from "@/scripts/enum/ResourceType";

const SelectionEngagementCategoryTab = defineAsyncComponent(
  () => import("@/components/selection/EngagementCategoryTab.vue")
);
const SelectionSubCategoryTab = defineAsyncComponent(
  () => import("@/components/selection/SubCategoryTab.vue")
);
const SelectMainCategory = defineAsyncComponent(
  () => import("@/components/selection/MainCategoryTab.vue")
);

// Editor content
const { toast } = useToast();
const router = useRouter();
const emitter = inject<Emitter<{ [event: string]: unknown }>>("emitter");
const module = ref<ModuleModel>({} as ModuleModel);
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

//computed
const subCategory = computed(() => {
  return module.value.subCategory == "" ? "All" : module.value.subCategory;
});

// Methods
const handleEditorUpdate = (output: any) => {
  editorOutput.value = output;
};

const onSubCategoryChange = (value: string) => {
  if (value) {
    module.value.subCategory =
      (value as string) == "All" ? "" : (value as string);
  }
};

const onMainCategoryChange = (value: string) => {
  if (value) {
    module.value.mainCategory = value as string;
    if (value != "Program") {
      module.value.subCategory = "";
    }
  }
};

const onEngagementSubCategoryChange = (value: string) => {
  switch (value) {
    case EngagementCategory.All:
    case EngagementCategoryKH.All:
      module.value.en.title = "";
      module.value.kh.title = "";
      break;
    case EngagementCategory.Advisor:
    case EngagementCategoryKH.Advisor:
      module.value.en.title = EngagementCategory.Advisor;
      module.value.kh.title = EngagementCategoryKH.Advisor;
      break;
    case EngagementCategory.Consultant:
    case EngagementCategoryKH.Consultant:
      module.value.en.title = EngagementCategory.Consultant;
      module.value.kh.title = EngagementCategoryKH.Consultant;
      break;
    case EngagementCategory.ExchangeProgram:
    case EngagementCategoryKH.ExchangeProgram:
      module.value.en.title = EngagementCategory.ExchangeProgram;
      module.value.kh.title = EngagementCategoryKH.ExchangeProgram;
      break;
    case EngagementCategory.Fellowship:
    case EngagementCategoryKH.Fellowship:
      module.value.en.title = EngagementCategory.Fellowship;
      module.value.kh.title = EngagementCategoryKH.Fellowship;
      break;
    case EngagementCategory.Partners:
    case EngagementCategoryKH.Partners:
      module.value.en.title = EngagementCategory.Partners;
      module.value.kh.title = EngagementCategoryKH.Partners;
      break;
    case EngagementCategory.Voluntary:
    case EngagementCategoryKH.Voluntary:
      module.value.en.title = EngagementCategory.Voluntary;
      module.value.kh.title = EngagementCategoryKH.Voluntary;
      break;
    default:
      module.value.en.title = "";
      module.value.kh.title = "";
      break;
  }
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

const onLoadContent = async (id: string) => {
  try {
    emitter?.emit("stateLoading", true);
    const { statusCode, data } = await retriveOneModuleHandler(id);
    if (statusCode === 200) {
      module.value = createModule(data as ModuleModel);
      previewImage.value = module.value.cover;
      editorContentEN.value = data.en?.document.content;
      editorContentKH.value = data.kh?.document?.content;
    }
  } catch (error) {
    console.log(error);
  } finally {
    emitter?.emit("stateLoading", false);
  }
};

const onHandleCreateModule = async () => {
  try {
    emitter?.emit("stateLoading", true);
    const { statusCode } = await createModuleHandler(module.value);
    if (statusCode === 200) {
      toast({
        title: "Success",
        description: "Create module Success",
        variant: "success",
      });
      setTimeout(() => {
        router.push({ name: source.value });
      }, 300);
    } else {
      toast({
        title: "Something went wrong",
        description: "",
        variant: "warning",
      });
    }
  } catch (error) {
    console.log(error);
  } finally {
    emitter?.emit("stateLoading", false);
  }
};

const onHandleUpdateModule = async () => {
  try {
    emitter?.emit("stateLoading", true);
    const { statusCode, message } = await updateModuleHandler(
      module.value as ModuleModel
    );
    if (statusCode === 200) {
      toast({
        title: "Success",
        description: "Update Module Success",
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
  if (module.value.mainCategory == "") {
    toast({
      title: "Please select Main-Category",
      variant: "warning",
    });
    return false;
  }

  if (module.value.subCategory == undefined && module.value.mainCategory == "Program") {
    toast({
      title: "Please select Sub-Category",
      variant: "warning",
    });
    return false;
  }

  if (module.value.en.title == "" || module.value.kh.title == "") {
    toast({
      title: "Please Input Title",
      variant: "warning",
    });
    return false;
  }

  return true;
};

const onSaveContent = async () => {
  try {
    if (!(await onValidationOfContent())) {
      return;
    }
    emitter?.emit("stateLoading", true);
    if (_fileChange.value && _file.value) {
      try {
        const { data, statusCode } = await uploadFileHandler(_file.value);

        if (statusCode === 200 && data?.url) {
          module.value.cover = data.url;
        } else {
          throw new Error("File upload failed");
        }
      } catch (error) {
        console.error(error);
        return;
      }
    }
    module.value.kh.document = {
      ...module.value.kh.document,
      content: editorContentKH.value,
    };
    module.value.en.document = {
      ...module.value.en.document,
      content: editorContentEN.value,
    };
    const action =
      status.value === "New" ? onHandleCreateModule : onHandleUpdateModule;
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

// onMounted(async () => {
//   await onLoadTags();
//   await onLoadMinistry();
// });

watch(
  () => route.query,
  async (value) => {
    status.value = value.status === "new" ? "New" : "Update";
    source.value = value.source as string;
    module.value = createModule({} as ModuleModel);

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
