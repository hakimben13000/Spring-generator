$(document).ready(function(){
    var cmDAO=CodeMirror.fromTextArea(document.getElementById("resultDAO"), {
        mode:  "text/x-java",
        indentWithTabs: true,
        smartIndent: true,
        lineNumbers: true,
        lineWrapping: true,
        matchBrackets : true,
        autofocus: true
      });  

      var cmDAOIMPL=CodeMirror.fromTextArea(document.getElementById("resultDAOIMPL"), {
        mode:  "text/x-java",
        indentWithTabs: true,
        smartIndent: true,
        lineNumbers: true,
        lineWrapping: true,
        matchBrackets : true,
        autofocus: true
      }); 

        var cmService=CodeMirror.fromTextArea(document.getElementById("resultService"), {
        mode:  "text/x-java",
        indentWithTabs: true,
        smartIndent: true,
        lineNumbers: true,
        lineWrapping: true,
        matchBrackets : true,
        autofocus: true
      });  

      var cmServiceIMPL=CodeMirror.fromTextArea(document.getElementById("resultServiceIMPL"), {
        mode:  "text/x-java",
        indentWithTabs: true,
        smartIndent: true,
        lineNumbers: true,
        lineWrapping: true,
        matchBrackets : true,
        autofocus: true
      }); 

      var cmController=CodeMirror.fromTextArea(document.getElementById("resultController"), {
        mode:  "text/x-java",
        indentWithTabs: true,
        smartIndent: true,
        lineNumbers: true,
        lineWrapping: true,
        matchBrackets : true,
        autofocus: true
      }); 
    $("#generer").click(function(){       
        cmDAO.setValue(getMyDao());
        cmDAOIMPL.setValue(getMyDaoIMPL());
        cmService.setValue(getMyService());
        cmServiceIMPL.setValue(getMyServiceIMPL());
        cmController.setValue(getMyController());
    });

    function NL()
    {
        return '\n';
    }

    function getModelName(lower=false)
    {
        var mymd=$("#modelname").val();
        if (!lower)
            return mymd
        else return mymd.toLowerCase();
    }

    function getPackageName()
    {
            return $("#package").val();      
    }

    function getorderByAtt()
    {
        return $("#orderByAtt").val();
    }

    function getSearchAtt()
    {
        return $("#SearchAtt").val();
    }


    function getMyDao(){
        var result="package "+getPackageName()+".dao; "+NL()+
        ""+NL()+
        " import java.util.List; "+NL()+
        ""+NL()+
        " import "+getPackageName()+".entity."+getModelName()+"; "+NL()+
        ""+NL()+
        " public interface "+getModelName()+"DAO { "+NL()+
        ""+NL()+
        "    public List<"+getModelName()+"> get"+getModelName()+"(); "+NL()+
        ""+NL()+
        "    public void save"+getModelName()+"("+getModelName()+" "+getModelName(true)+"); "+NL()+
        ""+NL()+
        "    public "+getModelName()+" get"+getModelName()+"(int theId); "+NL()+
        ""+NL()+
        "    public void delete"+getModelName()+"(int theId); "+NL()+
        ""+NL()+    
        "    public List<"+getModelName()+"> search"+getModelName()+"(String theSearchName);"+NL()+ 
            
        "}";

        return result;
    }

    function getMyDaoIMPL(){

        var result = 'package '+getPackageName()+'.dao;'+NL()+
        ''+NL()+
        'import java.util.List;'+NL()+
        ''+NL()+
        'import org.hibernate.Session;'+NL()+
        'import org.hibernate.SessionFactory;'+NL()+
        'import org.hibernate.query.Query;'+NL()+
        'import org.springframework.beans.factory.annotation.Autowired;'+NL()+
        'import org.springframework.stereotype.Repository;'+NL()+
        'import org.springframework.transaction.annotation.Transactional;'+NL()+
        ''+NL()+
        'import '+getPackageName()+'.entity.'+getModelName()+';'+NL()+
        ''+NL()+
        '@Repository'+NL()+
        'public class '+getModelName()+'DAOImpl implements '+getModelName()+'DAO {'+NL()+
        ''+NL()+
        '	@Autowired'+NL()+
        '	private SessionFactory sessionFactory;'+NL()+
        '	'+NL()+
        '	@Override'+NL()+
        '	public List<'+getModelName()+'> get'+getModelName()+'() {'+NL()+
        '		'+NL()+
        '		Session currentSession =sessionFactory.getCurrentSession();'+NL()+
        '		'+NL()+
        '	    Query <'+getModelName()+'> theQuery=	'+NL()+
        '			currentSession.createQuery("from '+getModelName()+' order by '+getorderByAtt()+'",'+getModelName()+'.class);'+NL()+
        '		'+NL()+
        '		List <'+getModelName()+'> '+getModelName(true)+'s=theQuery.getResultList();'+NL()+
        '		'+NL()+
        '		//return the results'+NL()+
        '		return '+getModelName(true)+'s;'+NL()+
        '	}'+NL()+
        ''+NL()+
        '	@Override'+NL()+
        '	public void save'+getModelName()+'('+getModelName()+' '+getModelName(true)+') {'+NL()+
        '	'+NL()+
        '		Session currentSession =sessionFactory.getCurrentSession();'+NL()+
        '		'+NL()+
        '		currentSession.saveOrUpdate('+getModelName(true)+');'+NL()+
        '	}'+NL()+
        ''+NL()+
        '	@Override'+NL()+
        '	public '+getModelName()+' get'+getModelName()+'(int theId) {'+NL()+
        '		Session currentSession =sessionFactory.getCurrentSession();'+NL()+
        '		'+getModelName()+' '+getModelName(true)+'=currentSession.get('+getModelName()+'.class,theId);'+NL()+
        '		return '+getModelName(true)+';'+NL()+
        '	}'+NL()+
        ''+NL()+
        '	@Override'+NL()+
        '	public void delete'+getModelName()+'(int theId) {'+NL()+
        '		Session currentSession =sessionFactory.getCurrentSession();'+NL()+
        '		'+NL()+
        '		Query theQuery=currentSession.createQuery("delete from '+getModelName()+' where id=:'+getModelName(false)+'Id");'+NL()+
        '		theQuery.setParameter("'+getModelName(false)+'Id", theId);'+NL()+
        '		theQuery.executeUpdate();'+NL()+
        '	}'+NL()+
        '	'+NL()+
        '	 @Override'+NL()+
        '	    public List<'+getModelName()+'> search'+getModelName()+'s(String theSearchName) {'+NL()+
        ''+NL()+
        '	        Session currentSession = sessionFactory.getCurrentSession();'+NL()+
        '	        '+NL()+
        '	        Query theQuery = null;'+NL()+
        '	        '+NL()+
        '	        if (theSearchName != null && theSearchName.trim().length() > 0) {'+NL()+
        ''+NL()+
        '	            theQuery =currentSession.createQuery("from '+getModelName()+' where lower('+getSearchAtt()+') like :theName  order by '+getorderByAtt()+'", '+getorderByAtt()+'.class);'+NL()+
        '	            theQuery.setParameter("theName", "%" + theSearchName.toLowerCase() + "%");'+NL()+
        ''+NL()+
        '	        }'+NL()+
        '	        else {'+NL()+
        '	            theQuery =currentSession.createQuery("from '+getModelName()+' order by '+getorderByAtt()+'", '+getModelName()+'.class);            '+NL()+
        '	        }'+NL()+
        '	        '+NL()+

        '	        List<'+getModelName()+'> '+getModelName(false)+'s = theQuery.getResultList();'+NL()+
        '	                '+NL()+
        '	        // return the results        '+NL()+
        '	        return '+getModelName(false)+'s;'+NL()+
        '	        '+NL()+
        '	    }'+NL()+
        ''+NL()+
        '}';
            
        
        return result;
    }
    function getMyService(){
        var result="package "+getPackageName()+".service; "+NL()+
        ""+NL()+
        " import java.util.List; "+NL()+
        ""+NL()+
        " import "+getPackageName()+".entity."+getModelName()+"; "+NL()+
        ""+NL()+
        "public interface "+getModelName()+"Service { "+NL()+
        ""+NL()+
        "    public List<"+getModelName()+"> get"+getModelName()+"s(); "+NL()+
        ""+NL()+
        "    public void save"+getModelName()+"("+getModelName()+" "+getModelName(true)+"); "+NL()+
        ""+NL()+
        "    public "+getModelName()+" get"+getModelName()+"(int theId); "+NL()+
        ""+NL()+
        "    public void delete"+getModelName()+"(int theId); "+NL()+
        ""+NL()+    
        "    public List<"+getModelName()+"> search"+getModelName()+"s(String theSearchName);"+NL()+ 
            
        "}";

        return result;
    }

    function getMyServiceIMPL(){

        var result = 'package '+getPackageName()+'.service;'+NL()+
        ''+NL()+
        'import java.util.List;'+NL()+
        ''+NL()+
        'import org.springframework.beans.factory.annotation.Autowired;'+NL()+
        'import org.springframework.stereotype.Repository;'+NL()+
        'import org.springframework.transaction.annotation.Transactional;'+NL()+
        ''+NL()+
        'import '+getPackageName()+'.entity.'+getModelName()+';'+NL()+
        'import '+getPackageName()+'.dao.'+getModelName()+'DAO;'+NL()+
        ''+NL()+
        '@Service'+NL()+
        'public class '+getModelName()+'ServiceImpl implements '+getModelName()+'Service {'+NL()+
        ''+NL()+
        '   @Autowired'+NL()+
        '   private '+getModelName()+'DAO ' +getModelName(true)+'DAO;'+NL()+
        '   '+NL()+
        '   @Override'+NL()+
        '   @Transactional'+NL()+
        '   public List<'+getModelName()+'> get'+getModelName()+'s() {'+NL()+
        '       '+NL()+
        '       return '+getModelName(true)+'DAO.get'+getModelName()+'s();'+NL()+
        '   }'+NL()+
        ''+NL()+
        '   @Override'+NL()+
        '   @Transactional'+NL()+
        '   public void save'+getModelName()+'('+getModelName()+' the'+getModelName()+') {'+NL()+
        '   '+NL()+
        '       '+getModelName(true)+'DAO.save'+getModelName()+'(the'+getModelName()+');'+NL()+        '   }'+NL()+
        '   }'+NL()+
        ''+NL()+
        '   @Override'+NL()+
        '   @Transactional'+NL()+
        '   public '+getModelName()+' get'+getModelName()+'(int theId) {'+NL()+
        '       return '+getModelName(true)+'DAO.get'+getModelName()+'(theId)'+NL()+
        '   }'+NL()+
        ''+NL()+
        '   @Override'+NL()+
        '   @Transactional'+NL()+
        '   public void delete'+getModelName()+'(int theId) {'+NL()+
        '       '+getModelName(true)+'DAO.delete'+getModelName()+'(theId);'+NL()+
        '   }'+NL()+
        '   '+NL()+
        '   @Override'+NL()+
        '   @Transactional'+NL()+
        '   public List<'+getModelName()+'> search'+getModelName()+'s(String theSearchName) {'+NL()+
        ''+NL()+
        '       return '+getModelName(true)+'DAO.search'+getModelName()+'s'+'(theSearchName);'+NL()+
        '   }'+NL()+
        '}';
            
        
        return result;
    }

      function getMyController(){

        var result = 'package '+getPackageName()+'.controller;'+NL()+
        ''+NL()+
        'import java.util.List;'+NL()+
        ''+NL()+
        'import org.springframework.beans.factory.annotation.Autowired;'+NL()+
        'import org.springframework.stereotype.Controller;'+NL()+
        'import org.springframework.ui.Model;'+NL()+
        'import org.springframework.web.bind.annotation.GetMapping;'+NL()+
        'import org.springframework.web.bind.annotation.ModelAttribute;'+NL()+
        'import org.springframework.web.bind.annotation.PostMapping;'+NL()+
        'import org.springframework.web.bind.annotation.RequestMapping;'+NL()+
        'import org.springframework.web.bind.annotation.RequestParam;'+NL()+
        ''+NL()+
        'import '+getPackageName()+'.dao.'+getModelName()+'DAO;'+NL()+
        'import '+getPackageName()+'.entity.'+getModelName()+';'+NL()+
        'import '+getPackageName()+'.service.'+getModelName()+'Service;'+NL()+
        ''+NL()+
        '@Controller'+NL()+
        '@RequestMapping("/'+getModelName(true)+')'+NL()+
        'public class '+getModelName()+'Controller {'+NL()+
        ''+NL()+
        '    @Autowired'+NL()+
        '    private '+getModelName()+'Service ' +getModelName(true)+'Service;'+NL()+
        '   '+NL()+
        '    @GetMapping("/list)'+NL()+
        '    public String list'+getModelName()+'(Model theModel) {'+NL()+
        '       '+NL()+
        '        List <'+getModelName()+'> the'+getModelName()+'s='+getModelName(true)+'Service.get'+getModelName()+'s();'+NL()+
        ''+NL()+
        '        theModel.addAttribute("'+getModelName(true)+'s,the'+getModelName()+'s);'+NL()+
        ''+NL()+
        '        return "list-'+getModelName(true)+'s";'+NL()+
        '   }'+NL()+
        ''+NL()+
        '   @GetMapping("/showFormForAdd")'+NL()+
        '   public String ShowFormForAdd(Model theModel) {'+NL()+
        '       '+NL()+
        '       '+getModelName()+' the'+getModelName()+'=new '+getModelName()+'();'+NL()+
        ''+NL()+
        '       theModel.addAttribute("'+getModelName(true)+'",the'+getModelName()+');'+NL()+
        ''+NL()+
        '       return "'+getModelName(true)+'-form";'+NL()+
        '   }'+NL()+
        ''+NL()+
        '   @PostMapping("/save'+getModelName()+'")'+NL()+
        '   public String save'+getModelName()+'(@ModelAttribute("'+getModelName(true)+'") '+getModelName()+'the'+getModelName()+') {'+NL()+
        ''+NL()+
        '     '+getModelName(true)+'Service.save'+getModelName()+'(the'+getModelName()+');'+NL()+
        ''+NL()+
        '       return "redirect:/'+getModelName(true)+'/list";'+NL()+
        '   }'+NL()+
        ''+NL()+
        '   @GetMapping("/showFormForUpdate")'+NL()+
        '   public String ShowFormForAdd(@RequestParam("'+getModelName(true)+'Id") int theId,Model theModel) {'+NL()+
        '       '+NL()+
        '       '+getModelName()+' the'+getModelName()+'='+getModelName(true)+'Service.get'+getModelName()+'(theId);'+NL()+
        ''+NL()+
        '       theModel.addAttribute("'+getModelName(true)+'",the'+getModelName()+');'+NL()+
        ''+NL()+
        '       return "'+getModelName(true)+'-form";'+NL()+
        '   }'+NL()+
        '   @GetMapping("/delete")'+NL()+
        '   public String delete'+getModelName()+'(@RequestParam("'+getModelName(true)+'Id") int theId,Model theModel) {'+NL()+
        '       '+NL()+
        '       '+getModelName(true)+'Service.delete'+getModelName()+'(theId);'+NL()+
        ''+NL()+
        '       return "redirect:/'+getModelName(true)+'/list";'+NL()+
        '   }'+NL()+
        ''+NL()+
        '   @PostMapping("/search")'+NL()+
        '   public String search'+getModelName()+'s(@RequestParam("theSearchName") String theSearchName,Model theModel) {'+NL()+
        '       '+NL()+
        '       List <'+getModelName()+'> the'+getModelName()+'s='+getModelName(true)+'Service.search'+getModelName()+'s(theSearchName);'+NL()+
        ''+NL()+
        '       theModel.addAttribute("'+getModelName(true)+'s", the'+getModelName()+'s);'+NL()+
        ''+NL()+
        '       return "list-'+getModelName(true)+'s";'+NL()+
        '   }'+NL()+

        '}';


        return result;
    }

  });