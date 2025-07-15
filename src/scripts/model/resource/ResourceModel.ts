export const createResource = (
  data: Partial<ResourceModel> = {}
): ResourceModel => ({
  id: data._id || undefined,
  _id: data._id || undefined,
  title: data.title || "",
  lang: data.lang || "",
  cover: data.cover || "",
  file: data.file || [],
  sub_type: data.sub_type || "",
  type: data.type || "",
  publishedAt: data.publishedAt || new Date().toISOString().slice(0, 10),
  source: data.source || "",
});

interface FileItem {
  file_name: string;
  size: number | undefined;
  url: string;
}

export default interface ResourceModel {
    _id?: string,
    id?: string,
    title: string,
    lang: string,
    cover: string,
    file: FileItem[],
    type: string,
    sub_type: string
    publishedAt: string,
    created_at?: Date,
    updated_at? : Date,
    source: SourceModel | string
}

interface SourceModel {
  _id: string | undefined;
}
