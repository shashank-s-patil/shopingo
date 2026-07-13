import ProductImageUpload from "@/components/admin-view/image-upload";
import AdminProductTile from "@/components/admin-view/product-tile";
import CommonForm from "@/components/common/form";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";
import { addProductFormElements } from "@/config";
import { addNewProduct, deleteProduct, editProduct, fetchAllProducts } from "@/store/admin/products-slice";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Plus } from "lucide-react";

const initialFormData = {
  image: null, title: "", description: "", category: "", brand: "",
  price: "", salePrice: "", totalStock: "", averageReview: 0,
};

function AdminProducts() {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const { productList } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();
    currentEditedId !== null
      ? dispatch(editProduct({ id: currentEditedId, formData })).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllProducts());
            setFormData(initialFormData);
            setOpenCreateProductsDialog(false);
            setCurrentEditedId(null);
          }
        })
      : dispatch(addNewProduct({ ...formData, image: uploadedImageUrl })).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllProducts());
            setOpenCreateProductsDialog(false);
            setImageFile(null);
            setFormData(initialFormData);
            toast({ title: "Product added successfully" });
          }
        });
  }

  function handleDelete(getCurrentProductId) {
    dispatch(deleteProduct(getCurrentProductId)).then((data) => {
      if (data?.payload?.success) dispatch(fetchAllProducts());
    });
  }

  function isFormValid() {
    return Object.keys(formData)
      .filter((key) => key !== "averageReview")
      .map((key) => formData[key] !== "")
      .every((item) => item);
  }

  useEffect(() => { dispatch(fetchAllProducts()); }, [dispatch]);

  return (
    <Fragment>
      <div className="p-8 min-h-screen" style={{ background: "var(--obsidian)" }}>
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="section-eyebrow mb-2">Inventory</p>
            <h1 className="section-title">Products</h1>
            <div className="divider-gold w-16 mt-4" />
          </div>
          <button
            onClick={() => setOpenCreateProductsDialog(true)}
            className="btn-gold flex items-center gap-2 px-6 py-3"
            style={{ borderRadius: "2px" }}
          >
            <Plus className="w-3.5 h-3.5" />
            Add Product
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
          {productList && productList.length > 0
            ? productList.map((productItem) => (
                <AdminProductTile
                  key={productItem._id}
                  setFormData={setFormData}
                  setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                  setCurrentEditedId={setCurrentEditedId}
                  product={productItem}
                  handleDelete={handleDelete}
                />
              ))
            : null}
        </div>
      </div>

      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => { setOpenCreateProductsDialog(false); setCurrentEditedId(null); setFormData(initialFormData); }}
      >
        <SheetContent
          side="right"
          className="overflow-auto w-full sm:max-w-md"
          style={{ background: "var(--charcoal)", border: "none", borderLeft: "1px solid rgba(201,169,110,0.15)" }}
        >
          <SheetHeader className="pb-6" style={{ borderBottom: "1px solid rgba(201,169,110,0.1)" }}>
            <SheetTitle style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", fontWeight: 400, color: "var(--cream)" }}>
              {currentEditedId !== null ? "Edit Product" : "Add New Product"}
            </SheetTitle>
          </SheetHeader>

          <div className="pt-6">
            <ProductImageUpload
              imageFile={imageFile}
              setImageFile={setImageFile}
              uploadedImageUrl={uploadedImageUrl}
              setUploadedImageUrl={setUploadedImageUrl}
              setImageLoadingState={setImageLoadingState}
              imageLoadingState={imageLoadingState}
              isEditMode={currentEditedId !== null}
            />
            <div className="mt-6">
              <CommonForm
                onSubmit={onSubmit}
                formData={formData}
                setFormData={setFormData}
                buttonText={currentEditedId !== null ? "Save Changes" : "Add Product"}
                formControls={addProductFormElements}
                isBtnDisabled={!isFormValid()}
              />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminProducts;
