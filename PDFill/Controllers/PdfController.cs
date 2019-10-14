using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PDFill.Models;
using Syncfusion.DocIO;
using Syncfusion.DocIO.DLS;

namespace PDFill.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PdfController : ControllerBase
    {

        [HttpPost("Upload")]
        public async Task<ActionResult<FormFill>> UploadPDF(IFormFile file)
        {
            var formFill = new FormFill();
            if (file == null || file.Length == 0)
                return Content("file not selected");

            var path = Path.Combine(
                        Directory.GetCurrentDirectory(), "wwwroot",
                        file.FileName);

            using (var stream = new FileStream(path, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }
            WordDocument doc = new WordDocument(file.OpenReadStream(), FormatType.Docx);
            //Get the pattern for regular expression
            Regex regex = new Regex("{[A-Za-z]+}");
            var items = doc.FindAll(regex);
            foreach (var item in items)
            {
                formFill.Items.Add(new Item { Key = item.SelectedText });
            }
            formFill.Filename = file.FileName;
            return formFill;
        }


       [HttpPost("process")]
       public ActionResult CreatePDF(FormFill formFill)
        {
            string basePath = "";
            try
            {
                string dataPath2 = basePath + @"/Adventure.docx";
                FileStream fileStream1 = new FileStream(dataPath2, FileMode.Open, FileAccess.Read, FileShare.ReadWrite);
                //Load template document
                WordDocument doc = new WordDocument(fileStream1, FormatType.Docx);
                fileStream1.Dispose();
                fileStream1 = null;


                //Replace the text that matches the case and whole word
                foreach (var item in formFill.Items)
                {
                    doc.Replace(item.Key, item.Value, true, true);
                }

                try
                {
                    FormatType type = FormatType.Docx;
                    string filename = "Sample.docx";
                    string contenttype = "application/vnd.ms-word.document.12";
                    #region Document SaveOption
                    //Save as .doc format
                    switch  (formFill.DocFile)
                    {
                        case DocFile.Doc:
                            {
                            type = FormatType.Doc;
                            filename = "Sample.doc";
                            contenttype = "application/msword";
                            break;
                            }
                        case DocFile.XML:
                            {
                                type = FormatType.WordML;
                                filename = "Sample.xml";
                                contenttype = "application/msword";
                                break;
                            }
                    }
                    #endregion Document SaveOption
                    MemoryStream ms = new MemoryStream();
                    doc.Save(ms, type);
                    doc.Close();
                    ms.Position = 0;
                    return File(ms, contenttype, filename);
                }
                catch (Exception)
                { }
            }
            catch (Exception)
            { }
            return BadRequest();
        }
    }
}