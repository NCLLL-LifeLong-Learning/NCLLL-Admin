<!-- TiptapEditor.vue -->
<template>
  <div class="tiptap-editor">
    <div class="editor-menu" v-if="editor">
      <!-- Text formatting -->
      <div class="menu-section">
        <button type="button" @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }"
          title="Bold">
          <span class="icon">B</span>
        </button>
        <button type="button" @click="editor.chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }"
          title="Italic">
          <span class="icon">I</span>
        </button>
        <button type="button" @click="editor.chain().focus().toggleStrike().run()" :class="{ 'is-active': editor.isActive('strike') }"
          title="Strike">
          <span class="icon">S</span>
        </button>
        <button type="button" @click="editor.chain().focus().toggleUnderline().run()"
          :class="{ 'is-active': editor.isActive('underline') }" title="Underline">
          <span class="icon">U</span>
        </button>
        <button type="button" @click="editor.chain().focus().toggleCode().run()" :class="{ 'is-active': editor.isActive('code') }"
          title="Code">
          <span class="icon">{'<>'}</span>
        </button>
        <button type="button" @click="editor.chain().focus().toggleHighlight().run()"
          :class="{ 'is-active': editor.isActive('highlight') }" title="Highlight">
          <span class="icon">H</span>
        </button>
      </div>

      <!-- Headings -->
      <div class="menu-section">
        <button type="button" @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }" title="Heading 1">
          <span>H1</span>
        </button>
        <button type="button" @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }" title="Heading 2">
          <span>H2</span>
        </button>
        <button type="button" @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }" title="Heading 3">
          <span>H3</span>
        </button>
        <button type="button" @click="editor.chain().focus().setParagraph().run()"
          :class="{ 'is-active': editor.isActive('paragraph') }" title="Paragraph">
          <span>P</span>
        </button>
      </div>

      <!-- Lists -->
      <div class="menu-section">
        <button type="button" @click="editor.chain().focus().toggleBulletList().run()"
          :class="{ 'is-active': editor.isActive('bulletList') }" title="Bullet List">
          <span class="icon">•</span>
        </button>
        <button type="button" @click="editor.chain().focus().toggleOrderedList().run()"
          :class="{ 'is-active': editor.isActive('orderedList') }" title="Ordered List">
          <span class="icon">1.</span>
        </button>
        <button type="button" @click="editor.chain().focus().toggleTaskList().run()"
          :class="{ 'is-active': editor.isActive('taskList') }" title="Task List">
          <span class="icon">☑</span>
        </button>
      </div>

      <!-- Blockquote, Code Block, Horizontal Rule -->
      <div class="menu-section">
        <button type="button" @click="editor.chain().focus().toggleBlockquote().run()"
          :class="{ 'is-active': editor.isActive('blockquote') }" title="Blockquote">
          <span class="icon">"</span>
        </button>
        <button type="button" @click="editor.chain().focus().toggleCodeBlock().run()"
          :class="{ 'is-active': editor.isActive('codeBlock') }" title="Code Block">
          <span class="icon">{ }</span>
        </button>
        <button type="button" @click="editor.chain().focus().setHorizontalRule().run()" title="Horizontal Rule">
          <span class="icon">―</span>
        </button>
      </div>

      <!-- Alignment -->
      <div class="menu-section">
        <button type="button" @click="editor.chain().focus().setTextAlign('left').run()"
          :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }" title="Align Left">
          <span class="icon">←</span>
        </button>
        <button type="button" @click="editor.chain().focus().setTextAlign('center').run()"
          :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }" title="Align Center">
          <span class="icon">↔</span>
        </button>
        <button type="button" @click="editor.chain().focus().setTextAlign('right').run()"
          :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }" title="Align Right">
          <span class="icon">→</span>
        </button>
        <button type="button" @click="editor.chain().focus().setTextAlign('justify').run()"
          :class="{ 'is-active': editor.isActive({ textAlign: 'justify' }) }" title="Justify">
          <span class="icon">≡</span>
        </button>
      </div>

      <!-- Colors and Font -->
      <div class="menu-section">
        <div class="color-picker">
          <label>Color</label>
          <input type="color" @input="setColor" :value="currentColor" />
        </div>
        <div class="color-picker">
          <label>Highlight</label>
          <input type="color" @input="setHighlight" :value="currentHighlight" />
        </div>
        <select @change="setFontFamily">
          <option value="">Font</option>
          <option value="Arial">Arial</option>
          <option value="Courier New">Courier New</option>
          <option value="Georgia">Georgia</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Verdana">Verdana</option>
        </select>
        <select @change="setFontSize">
          <option value="">Size</option>
          <option value="8pt">8pt</option>
          <option value="10pt">10pt</option>
          <option value="12pt">12pt</option>
          <option value="14pt">14pt</option>
          <option value="18pt">18pt</option>
          <option value="24pt">24pt</option>
          <option value="36pt">36pt</option>
        </select>
      </div>

      <!-- Links & Media -->
      <div class="menu-section">
        <button type="button" @click="showLinkModal = true" title="Insert Link">
          <span class="icon">🔗</span>
        </button>
        <button  @click="showImageModal = true" type="button" :disabled="!editor.can().setImage" title="Insert Image">
          <span class="icon">🖼️</span>
        </button>
        <button type="button" @click="showTableMenu = !showTableMenu" title="Insert Table">
          <span class="icon">📊</span>
        </button>
      </div>

      <!-- History -->
      <div class="menu-section">
        <button type="button" @click="editor.chain().focus().undo().run()" :disabled="!editor.can().undo()" title="Undo">
          <span class="icon">↩</span>
        </button>
        <button type="button" @click="editor.chain().focus().redo().run()" :disabled="!editor.can().redo()" title="Redo">
          <span class="icon">↪</span>
        </button>
      </div>
    </div>

    <!-- Table menu -->
    <div v-if="showTableMenu" class="table-menu">
      <div class="table-grid">
        <div v-for="row in 5" :key="`row-${row}`" class="table-row">
          <div v-for="col in 5" :key="`col-${col}`" class="table-cell" type="button" @mouseover="setTableSize(row, col)"
            @click="insertTable(row, col)"></div>
        </div>
      </div>
      <div class="table-size">{{ tableRows }} x {{ tableCols }}</div>
    </div>

    <!-- Table controls -->
    <div v-if="editor?.isActive('table')" class="table-controls">
      <button type="button" @click="editor.chain().focus().addColumnBefore().run()">Add Column Before</button>
      <button type="button" @click="editor.chain().focus().addColumnAfter().run()">Add Column After</button>
      <button type="button" @click="editor.chain().focus().deleteColumn().run()">Delete Column</button>
      <button type="button" @click="editor.chain().focus().addRowBefore().run()">Add Row Before</button>
      <button type="button" @click="editor.chain().focus().addRowAfter().run()">Add Row After</button>
      <button type="button" @click="editor.chain().focus().deleteRow().run()">Delete Row</button>
      <button type="button" @click="editor.chain().focus().deleteTable().run()">Delete Table</button>
      <button type="button" @click="editor.chain().focus().mergeCells().run()">Merge Cells</button>
      <button type="button" @click="editor.chain().focus().splitCell().run()">Split Cell</button>
      <button type="button" @click="editor.chain().focus().toggleHeaderColumn().run()">Toggle Header Column</button>
      <button type="button" @click="editor.chain().focus().toggleHeaderRow().run()">Toggle Header Row</button>
      <button type="button" @click="editor.chain().focus().toggleHeaderCell().run()">Toggle Header Cell</button>
    </div>

    <!-- Link Modal -->
    <div v-if="showLinkModal" class="modal">
      <div class="modal-content">
        <h3>Insert Link</h3>

        <div class="input-group">
          <label>URL:</label>
          <input type="text" v-model="linkUrl" placeholder="https://example.com" class="modal-input" />
        </div>

        <div class="input-group">
          <label>Text:</label>
          <input type="text" v-model="linkText" placeholder="Link text" class="modal-input" />
        </div>

        <div class="modal-buttons">
          <button type="button" @click="cancelLink">Cancel</button>
          <button  type="button" @click="setLink" :disabled="!linkUrl">Insert</button>
        </div>
      </div>
    </div>

    <!-- Image Modal -->
    <div v-if="showImageModal" class="modal">
      <div class="modal-content">
        <!-- <h3>Insert Image</h3> -->

        <!-- <div class="input-group">
          <label>Image URL:</label>
          <input type="text" v-model="imageUrl" placeholder="https://example.com/image.jpg" class="modal-input" />
        </div>

        <div class="input-group">
          <label>Alt Text:</label>
          <input type="text" v-model="imageAlt" placeholder="Image description" class="modal-input" />
        </div> -->

        
        <div class="image-preview">
          <img v-if="imageUrl" :src="imageUrl" :alt="imageAlt || 'Preview'" />
        </div>
        
        <div class="input-group">
          <label>{{ $t('upload_image') }}</label>
          <input type="file" @change="handleImageUpload" accept="image/*" class="file-input" />
        </div>
        <div class="modal-buttons">
          <button type="button" @click="cancelImage">Cancel</button>
          <button type="button" @click="insertImage" :disabled="!imageUrl">Insert</button>
        </div>
      </div>
    </div>

    <!-- Editor Content -->
    <editor-content v-if="editor" :editor="editor" class="editor-content" />
    <div v-else class="editor-loading">Loading editor...</div>

    <!-- Character Count -->
    <div v-if="editor" class="character-count">
      {{ editor.storage.characterCount.characters() }} characters &nbsp;
      {{ editor.storage.characterCount.words() }} words
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, nextTick, inject } from 'vue';
import { Editor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import FontFamily from '@tiptap/extension-font-family';
import FontSize from '@tiptap/extension-font-size';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Highlight from '@tiptap/extension-highlight';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import CharacterCount from '@tiptap/extension-character-count';
import { uploadFileHandler } from '@/scripts/handler/FileUploadHanlder';
import type { Emitter } from 'mitt';

const emitter = inject<Emitter<{ [event: string]: unknown }>>('emitter');

// Define props
const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({ type: 'doc', content: [] }),
  },
  placeholder: {
    type: String,
    default: 'Write something...'
  },
  editable: {
    type: Boolean,
    default: true
  }
});

// Define emits
const emit = defineEmits(['update:modelValue', 'editor-update', 'editor-ready']);

// Editor instance
const editor = ref<any>(null);

// Editor state tracking
const editorInitialized = ref(false);
const currentColor = ref('#000000');
const currentHighlight = ref('#ffff00');

// Link modal
const showLinkModal = ref(false);
const linkUrl = ref('');
const linkText = ref('');

// Image modal
const showImageModal = ref(false);
const imageUrl = ref('');
const imageAlt = ref('');
const imageFile = ref<File | null>(null);

// Table controls
const showTableMenu = ref(false);
const tableRows = ref(0);
const tableCols = ref(0);

// Initialize editor
const initEditor = () => {
  try {
    if (editorInitialized.value) return;

    editor.value = new Editor({
      extensions: [
        StarterKit,
        Underline,
        TextAlign.configure({
          types: ['heading', 'paragraph'],
          alignments: ['left', 'center', 'right', 'justify'],
        }),
        TextStyle,
        Color,
        FontFamily,
        FontSize,
        Link.configure({
          openOnClick: true,
          linkOnPaste: true,
        }),
        Image.configure({
          inline: false,
          allowBase64: true,
        }),
        Highlight.configure({
          multicolor: true,
        }),
        TaskList,
        TaskItem.configure({
          nested: true,
        }),
        Table.configure({
          resizable: true,
        }),
        TableRow,
        TableCell,
        TableHeader,
        CharacterCount,
      ],
      content: props.modelValue,
      editable: props.editable,
      autofocus: true,
      onUpdate: ({ editor }) => {
        emit('update:modelValue', editor.getJSON());
        emit('editor-update', {
          html: editor.getHTML(),
          text: editor.getText(),
          json: editor.getJSON(),
        });
      },
    });

    editorInitialized.value = true;
    emit('editor-ready', editor.value);
  } catch (error) {
    console.error('Failed to initialize TipTap editor:', error);
  }
};

// Set text color
const setColor = (event: Event) => {
  if (!editor.value) return;

  const color = (event.target as HTMLInputElement).value;
  currentColor.value = color;
  editor.value.chain().focus().setColor(color).run();
};

// Set highlight color
const setHighlight = (event: Event) => {
  if (!editor.value) return;

  const color = (event.target as HTMLInputElement).value;
  currentHighlight.value = color;
  editor.value.chain().focus().toggleHighlight({ color }).run();
};

// Set font family
const setFontFamily = (event: Event) => {
  if (!editor.value) return;

  const fontFamily = (event.target as HTMLSelectElement).value;
  if (fontFamily) {
    editor.value.chain().focus().setFontFamily(fontFamily).run();
  }
};

// Set font size
const setFontSize = (event: Event) => {
  if (!editor.value) return;

  const fontSize = (event.target as HTMLSelectElement).value;
  if (fontSize) {
    editor.value.chain().focus().setFontSize(fontSize).run();
  }
};

// Set link
const setLink = () => {
  if (!editor.value) return;

  // If text is selected, just add a link to it
  if (editor.value.state.selection.empty && linkText.value) {
    editor.value
      .chain()
      .focus()
      .insertContent(linkText.value)
      .setTextSelection({
        from: editor.value.state.selection.from - linkText.value.length,
        to: editor.value.state.selection.from
      })
      .setLink({ href: linkUrl.value })
      .run();
  } else {
    editor.value.chain().focus().setLink({ href: linkUrl.value }).run();
  }

  cancelLink();
};

// Cancel link insertion
const cancelLink = () => {
  showLinkModal.value = false;
  linkUrl.value = '';
  linkText.value = '';
};

// Handle image upload
const handleImageUpload = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    imageFile.value = input.files[0];
    // Read file as data URL
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        imageUrl.value = e.target.result as string;
      }
    };
    reader.readAsDataURL(imageFile.value);
  }
};

// Insert image
const insertImage = async () => {
  try {
    if (!editor.value || !imageUrl.value || !imageFile.value) return;

    emitter?.emit('stateLoading', true);
    const { data, statusCode } = await uploadFileHandler(imageFile.value as File);

    if (statusCode === 200 && data?.url) {
      editor.value
        .chain()
        .focus()
        .setImage({
          src: data?.url,
          alt: data?.url,
          title: "",
        })
        .run();
    } else {
      throw new Error('File upload failed');
    }
    cancelImage();
  } catch (error) {
    console.log(error);
  }finally{
    emitter?.emit('stateLoading', false);
  }
};

// Cancel image insertion
const cancelImage = () => {
  showImageModal.value = false;
  imageUrl.value = '';
  imageAlt.value = '';
  imageFile.value = null;
};

// Set table size
const setTableSize = (rows: number, cols: number) => {
  tableRows.value = rows;
  tableCols.value = cols;
};

// Insert table
const insertTable = (rows: number, cols: number) => {
  if (!editor.value) return;

  editor.value
    .chain()
    .focus()
    .insertTable({ rows, cols, withHeaderRow: false })
    .run();

  showTableMenu.value = false;
};

// Set up the editor when component is mounted
onMounted(() => {
  nextTick(() => {
    initEditor();
  });
});

// Clean up when component is unmounted
onBeforeUnmount(() => {
  if (editor.value) {
    editor.value.destroy();
    editor.value = null;
    editorInitialized.value = false;
  }
});

// Watch for prop changes
watch(() => props.modelValue, (newValue) => {
  if (!editor.value || !newValue) return;

  // Only update if content has changed
  const currentContent = JSON.stringify(editor.value.getJSON());
  const newContent = JSON.stringify(newValue);

  if (currentContent !== newContent) {
    editor.value.commands.setContent(newValue, false);
  }
}, { deep: true });

watch(() => props.editable, (editable) => {
  if (editor.value) {
    editor.value.setEditable(editable);
  }
});
</script>

<style scoped>
.tiptap-editor {
  display: flex;
  flex-direction: column;
  height: 100%;
  /* Full height */
}

.editor-menu {
  position: fixed;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  width: 92%;
  background: #fff;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  z-index: 1000;
}

.menu-section {
  display: flex;
  gap: 4px;
  padding: 0 4px;
  border-right: 1px solid #ddd;
  margin-right: 4px;
}

.menu-section:last-child {
  border-right: none;
}

button {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 30px;
  height: 30px;
}

button:hover {
  background-color: #f0f0f0;
}

button.is-active {
  background-color: #e9e9e9;
  border-color: #ccc;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.icon {
  font-size: 14px;
  pointer-events: none;
}

.color-picker {
  display: flex;
  align-items: center;
  gap: 4px;
}

.color-picker label {
  font-size: 12px;
}

select {
  height: 30px;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 0 4px;
  font-size: 14px;
  background-color: white;
}

.editor-content {
  margin-top: 80px;
  /* Adjust based on menu height */
  padding: 15px;
  flex: 1;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  border: 1px solid #ddd;
}

.editor-content :deep(.ProseMirror) {
  outline: none;
  min-height: 300px;
}

.editor-content :deep(.ProseMirror p.is-editor-empty:first-child::before) {
  content: attr(data-placeholder);
  float: left;
  color: #adb5bd;
  pointer-events: none;
  height: 0;
}

.editor-loading {
  padding: 16px;
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f9f9f9;
  color: #666;
}

.character-count {
  padding: 4px 16px;
  font-size: 12px;
  color: #666;
  border-top: 1px solid #ddd;
  background-color: #f5f5f5;
  text-align: right;
}

/* Modal styles */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  border-radius: 5px;
  padding: 20px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.input-group {
  margin-bottom: 12px;
}

.input-group label {
  display: block;
  margin-bottom: 4px;
  font-weight: 500;
}

.modal-input,
.file-input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.modal-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 16px;
}

.image-preview {
  margin-top: 12px;
  border: 1px solid #ddd;
  padding: 8px;
  border-radius: 4px;
  text-align: center;
  height: 200px;
}

.image-preview img {
  max-width: 100%;
  max-height: 200px;
}

/* Table menu */
.table-menu {
  position: absolute;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 8px;
  z-index: 100;
}

.table-grid {
  display: flex;
  flex-direction: column;
}

.table-row {
  display: flex;
}

.table-cell {
  width: 20px;
  height: 20px;
  border: 1px solid #ddd;
  margin: 1px;
  background-color: #f5f5f5;
}

.table-cell:hover {
  background-color: #c8e6c9;
  cursor: pointer;
}

.table-size {
  text-align: center;
  font-size: 12px;
  margin-top: 4px;
}

/* Table controls */
.table-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  padding: 8px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #ddd;
}

.table-controls button {
  font-size: 12px;
  padding: 4px 8px;
}

/* Editor content styles */
.editor-content :deep(.ProseMirror) {
  word-wrap: break-word;
}

.editor-content :deep(p) {
  margin: 0.75em 0;
}

.editor-content :deep(h1) {
  font-size: 2em;
  margin: 0.67em 0;
}

.editor-content :deep(h2) {
  font-size: 1.5em;
  margin: 0.83em 0;
}

.editor-content :deep(h3) {
  font-size: 1.17em;
  margin: 1em 0;
}

.editor-content :deep(ul),
.editor-content :deep(ol) {
  padding-left: 1.2em;
  margin: 0.75em 0;
}

.editor-content :deep(blockquote) {
  border-left: 3px solid #ddd;
  margin-left: 0;
  margin-right: 0;
  padding-left: 1em;
  font-style: italic;
  color: #666;
}

.editor-content :deep(pre) {
  background-color: #f5f5f5;
  padding: 0.75em;
  border-radius: 5px;
  overflow-x: auto;
}

.editor-content :deep(code) {
  font-family: 'Courier New', Courier, monospace;
  background-color: #f0f0f0;
  padding: 0.2em 0.4em;
  border-radius: 3px;
  font-size: 0.9em;
}

.editor-content :deep(table) {
  border-collapse: collapse;
  margin: 0;
  overflow: hidden;
  table-layout: fixed;
  width: 100%;
}

.editor-content :deep(table td),
.editor-content :deep(table th) {
  border: 2px solid #ced4da;
  box-sizing: border-box;
  min-width: 1em;
  padding: 3px 5px;
  position: relative;
  vertical-align: top;
}

.editor-content :deep(table th) {
  background-color: #f1f3f5;
  font-weight: bold;
  text-align: left;
}

.editor-content :deep(img) {
  max-width: 100%;
  width: 100%;
  height: auto;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.editor-content :deep(hr) {
  margin: 1rem 0;
  border: none;
  border-top: 2px solid #ced4da;
}

.editor-content :deep(a) {
  color: #0d6efd;
  text-decoration: underline;
}

.editor-content :deep(.text-align-left) {
  text-align: left;
}

.editor-content :deep(.text-align-center) {
  text-align: center;
}

.editor-content :deep(.text-align-right) {
  text-align: right;
}

.editor-content :deep(.text-align-justify) {
  text-align: justify;
}

.editor-content :deep(.task-list) {
  list-style-type: none;
  padding-left: 0;
}

.editor-content :deep(.task-list-item) {
  display: flex;
  align-items: flex-start;
  margin-bottom: 0.5em;
}

.editor-content :deep(.task-list-item-checkbox) {
  margin-right: 0.5em;
  margin-top: 0.3em;
}

.editor-content :deep(p) {
  margin: 0.75em 0;
}

.editor-content :deep(h1) {
  font-size: 2em;
  margin: 0.67em 0;
}

.editor-content :deep(h2) {
  font-size: 1.5em;
  margin: 0.83em 0;
}

.editor-content :deep(h3) {
  font-size: 1.17em;
  margin: 1em 0;
}

.editor-content :deep(ul),
.editor-content :deep(ol) {
  padding-left: 1.2em;
  margin: 0.75em 0;
}

.editor-content :deep(blockquote) {
  border-left: 3px solid #ddd;
  margin-left: 0;
  margin-right: 0;
  padding-left: 1em;
  font-style: italic;
  color: #666;
}

.editor-content :deep(pre) {
  background-color: #f5f5f5;
  padding: 0.75em;
  border-radius: 5px;
  overflow-x: auto;
}

.editor-content :deep(code) {
  font-family: 'Courier New', Courier, monospace;
  background-color: #f0f0f0;
  padding: 0.2em 0.4em;
  border-radius: 3px;
  font-size: 0.9em;
}
</style>