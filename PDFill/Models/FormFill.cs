using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PDFill.Models
{
    public class FormFill
    {
        public List<Item> Items { get; set; } = new List<Item>();
        public string Filename { get; set; }
        public DocFile DocFile { get; set; }
        
    }
    public class Item
    {
        public string Key { get; set; }
        public string Normalized { get; set; }
        public string Value { get; set; }
    }
    public enum DocFile
    {
        Doc,
        Docx,
        XML
    }
}
